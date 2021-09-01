import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {userReducer} from "./reducers/userReducer/userReducer";
import {fileReducer} from "./reducers/fileReducer/fileReducer";

// ! Figma https://www.figma.com/file/TDTKrjz93RzQh3nuzpws8H/MERN-CLOUD-DISK?node-id=2%3A100

const rootReducer = combineReducers({
    userReducer,
    fileReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
