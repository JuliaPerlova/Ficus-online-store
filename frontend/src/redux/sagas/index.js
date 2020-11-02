import { spawn } from "redux-saga/effects";
import writePostSaga from "./writePostSaga";
import postsSaga from "./postsSaga";

export default function* rootSaga() {
  console.log("Hello From Redux-Saga!");
  yield spawn(writePostSaga);
  yield spawn(postsSaga);
}
