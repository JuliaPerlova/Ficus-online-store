import { spawn } from "redux-saga/effects";
import writePostSaga from "./writePostSaga";

export default function* rootSaga() {
  console.log("Hello From Redux-Saga!");
  yield spawn(writePostSaga);
}
