import { combineReducers } from "redux";

import authReducer from "./authReducer";
import writePostReducer from "./writePostReducer";
import postsReducer from "./postsReducer";
import profileReducer from "./profileReducer";
import commentsReducer from "./commentsReducer";

export default combineReducers({
  authReducer,
  writePostReducer,
  postsReducer,
  profileReducer,
  commentsReducer,
});
