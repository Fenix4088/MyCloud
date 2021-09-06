
const actionTypes = {
    SET_FILES: 'SET_FILES/fileReducer',
    SET_CURRENT_DIR: 'SET_CURRENT_DIR/fileReducer',
}

const initialState = {
    files: [],
    currentDir: null
}

export const fileReducer = (state = initialState, action) => {
    const {SET_FILES, SET_CURRENT_DIR} = actionTypes;
    switch (action.type) {
        case SET_FILES: {
            return {...state, files: action.payload}
        }
        case SET_CURRENT_DIR: {
            return {...state, currentDir: action.payload}
        }
        default:
            return state;
    }
}

 const setFiles = (files) => {
    return {
        type: actionTypes.SET_FILES,
        payload: files
    }
}

const setCurrentDir = (dir) => {
    return {
        type: actionTypes.SET_CURRENT_DIR,
        payload: dir
    }
}