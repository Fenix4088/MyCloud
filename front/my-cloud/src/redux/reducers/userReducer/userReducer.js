import { authAPI } from '../../../api/auth';
import { LS } from '../../../utils/localStorage';

const actionTypes = {
  SAVE_USER_DATA: 'SAVE_USER_DATA/userReducer',
  Set_IS_AUTH: 'Set_IS_AUTH/userReducer',
};

const initialState = {
  currentUser: null,
  isAuth: false,
};

export const userReducer = (state = initialState, action) => {
  const { SAVE_USER_DATA, Set_IS_AUTH } = actionTypes;
  switch (action.type) {
    case SAVE_USER_DATA: {
      return { ...state, currentUser: action.payload };
    }
    case Set_IS_AUTH: {
      return { ...state, isAuth: action.status };
    }
    default:
      return state;
  }
};

const saveUser = (payload) => {
  return {
    type: actionTypes.SAVE_USER_DATA,
    payload,
  };
};

const setIsAuth = (status) => {
  return {
    type: actionTypes.Set_IS_AUTH,
    status,
  };
};


export const registration = (email, password) => async () => {
  try {
    const response = await authAPI.registration(email, password);
    console.log(response.data.message);
  } catch (e) {
    console.error(e);
  }
};

export const authorization = (email, password) => async (dispatch) => {
  try {
    const response = await authAPI.authorization(email, password);
    const { user, message, token } = response.data;

    dispatch(saveUser(user));
    dispatch(setIsAuth(true));
    LS.set('cloudToken', token);
    console.log(message);
  } catch (e) {
    dispatch(setIsAuth(false));
    if (!e.response.data.message) {
      console.error(e.message);
      return;
    }
    console.error(e.response.data.message);
  }
};

export const logout = () =>  (dispatch) => {
  LS.remove('cloudToken');
  dispatch(setIsAuth(false));
  dispatch(saveUser(null));
};
