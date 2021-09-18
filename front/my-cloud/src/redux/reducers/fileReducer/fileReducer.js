import { fileAPI } from '../../../api/file';

const actionTypes = {
  SET_FILES: 'SET_FILES/fileReducer',
  SET_CURRENT_DIR: 'SET_CURRENT_DIR/fileReducer',
  TOGGLE_POPUP: 'TOGGLE_POPUP/fileReducer',
  CREATE_FOLDER: 'CREATE_FOLDER/fileReducer',
  PUT_TO_STACK: 'PUT_TO_STACK/fileReducer',
  REMOVE_FROM_STACK: 'REMOVE_FROM_STACK/fileReducer',
};

const initialState = {
  files: [],
  currentDir: null,
  isPopupVisible: false,
  dirStack: [],
};

export const fileReducer = (state = initialState, action) => {
  const { SET_FILES, SET_CURRENT_DIR, TOGGLE_POPUP, CREATE_FOLDER, PUT_TO_STACK, REMOVE_FROM_STACK } = actionTypes;
  switch (action.type) {
    case SET_FILES: {
      return { ...state, files: action.payload };
    }
    case SET_CURRENT_DIR: {
      return { ...state, currentDir: action.payload };
    }
    case TOGGLE_POPUP: {
      return { ...state, isPopupVisible: action.status };
    }
    case CREATE_FOLDER: {
      return { ...state, files: [...state.files, action.file] };
    }
    case PUT_TO_STACK: {
      return { ...state, dirStack: [...state.dirStack, action.dir]};
    }
    case REMOVE_FROM_STACK: {
      return { ...state, dirStack: action.dirStack};
    }
    default:
      return state;
  }
};

const setFiles = (files) => {
  return {
    type: actionTypes.SET_FILES,
    payload: files,
  };
};

export const setCurrentDir = (dir) => {
  return {
    type: actionTypes.SET_CURRENT_DIR,
    payload: dir,
  };
};

export const togglePopUp = (status) => {
  return {
    type: actionTypes.TOGGLE_POPUP,
    status,
  };
};

export const createNewFolder = (file) => {
  return {
    type: actionTypes.CREATE_FOLDER,
    file
  }
}

export const putToStack = (dir) => {
  return {
    type: actionTypes.PUT_TO_STACK,
    dir
  }
}

export const removeFromStack = (dirStack) => {
  return {
    type: actionTypes.REMOVE_FROM_STACK,
    dirStack
  }
}


// * Thunk
export const fetchFiles = (dirId) => async (dispatch) => {
  try {
    const files = await fileAPI.getFiles(dirId);

    dispatch(setFiles(files.data));
  } catch (e) {
    console.error(e);
  }
};

export const createFolder = (name, type, parent) => async (dispatch) => {
  try {
    const response = await fileAPI.createFolder(name, type, parent);
    dispatch(createNewFolder({name, type, parent}));
    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
};
