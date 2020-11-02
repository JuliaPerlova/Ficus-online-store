import { put, call, takeEvery, select } from "redux-saga/effects";

import {
  SET_LOADING,
  GET_RESULT,
  GET_RESULT_REQUESTED,
} from "../actions/writePostActions";

import { createPost } from "../../api";

function* createPostGenerator() {
  yield put({ type: SET_LOADING });
  const content = yield select((store) => store.writePostReducer.content);
  const preview = yield select((store) => store.writePostReducer.preview);
  const response = yield call(createPost, {
    body: { text: content, preview: preview },
  });
  yield put({ type: GET_RESULT, payload: response });
}

export default function* writePostSaga() {
  yield takeEvery(GET_RESULT_REQUESTED, createPostGenerator);
}
