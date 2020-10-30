import { spawn } from "redux-saga/effects";
import { authSaga } from "./authSaga";

export default function* rootSaga() {
  console.log("Hello From Redux-Saga!");
  yield spawn(authSaga);
}
