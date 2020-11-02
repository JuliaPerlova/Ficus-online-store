import { combineReducers } from "redux";

import authReducer from "./authReducer";
import writePostReducer from "./writePostReducer";

export default combineReducers({ authReducer, writePostReducer });
