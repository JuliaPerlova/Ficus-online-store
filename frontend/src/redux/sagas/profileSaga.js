import { put, call, takeEvery, select } from "redux-saga/effects";

import {
  GET_PROFILE_INFO_REQUESTED,
  GET_PROFILE_INFO,
  SET_LOADING,
  GET_AVATAR_ID,
  GET_AVATAR_URL,
  GET_AVATAR_REQUESTED,
} from "../actions/profileActions";

import { getProfileInfo, uploadAvatar } from "../../api";

function* getProfileInfoGenerator() {
  const response = yield call(getProfileInfo);
  yield put({ type: GET_PROFILE_INFO, payload: response });
}

function* getAvatarGenerator() {
  yield put({ type: SET_LOADING });
  const file = yield select((store) => store.profileReducer.file);
  const formData = new FormData();
  formData.append("upload", file);
  const response = yield call(uploadAvatar, formData);
  yield put({ type: GET_AVATAR_ID, payload: response.public_id });
  yield put({ type: GET_AVATAR_URL, payload: response.url });
}

export default function* profileSaga() {
  yield takeEvery(GET_PROFILE_INFO_REQUESTED, getProfileInfoGenerator);
  yield takeEvery(GET_AVATAR_REQUESTED, getAvatarGenerator);
}
