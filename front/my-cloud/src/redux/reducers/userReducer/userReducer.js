import {authAPI} from "../../../api/auth";

const initialState = {
    currentUser: null,
    isAuth: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}


export const registration = (email, password) => async () => {
    try {
        const response = await authAPI.registration(email, password);
        console.log(response.data.message);
    } catch(e) {
        console.error(e)
    }
}

export const authorization = (email, password) => async () => {
    try {
        const response = await authAPI.authorization(email, password);
        console.log(response.data);
    } catch(e) {
        console.error(e)
    }
}