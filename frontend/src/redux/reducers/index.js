import { combineReducers } from "redux";

import authReducer from "./authReducer";
import writePostReducer from "./writePostReducer";
import postsReducer from "./postsReducer";

export default combineReducers({ authReducer, writePostReducer, postsReducer });
