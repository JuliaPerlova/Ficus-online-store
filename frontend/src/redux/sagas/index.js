import { spawn } from "redux-saga/effects";
import writePostSaga from "./writePostSaga";
import postsSaga from "./postsSaga";
import profileSaga from "./profileSaga";
import commentsSaga from "./commentsSaga";

export default function* rootSaga() {
  console.log("Hello From Redux-Saga!");
  yield spawn(writePostSaga);
  yield spawn(postsSaga);
  yield spawn(profileSaga);
  yield spawn(commentsSaga);
}
