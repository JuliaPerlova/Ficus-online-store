import { put, call, takeEvery } from "redux-saga/effects";

import {
  GET_PROFILE_INFO_REQUESTED,
  GET_PROFILE_INFO,
} from "../actions/profileActions";

import { getProfileInfo } from "../../api";

function* getProfileInfoGenerator() {
  const response = yield call(getProfileInfo);
  yield put({ type: GET_PROFILE_INFO, payload: response });
}

export default function* profileSaga() {
  yield takeEvery(GET_PROFILE_INFO_REQUESTED, getProfileInfoGenerator);
}
