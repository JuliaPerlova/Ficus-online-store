import { put, call, takeEvery, select } from "redux-saga/effects";

import {
  SET_LOADING,
  GET_RESULT,
  GET_RESULT_REQUESTED,
  SET_MESSAGE,
  SET_ERROR,
} from "../actions/writePostActions";

import { createPost } from "../../api";

const previewExtractor = (html, numOfextractNodes) => {
  const htmlToDom = new DOMParser().parseFromString(html, "text/html");
  const container = document.createElement("body");
  htmlToDom.body.childNodes.forEach((el) => {
    if (container.childNodes.length > numOfextractNodes) {
      return;
    }
    return container.append(el.cloneNode(true));
  });
  return container.innerHTML;
};

function* createPostGenerator() {
  yield put({ type: SET_LOADING });
  const content = yield select((store) => store.writePostReducer.content);
  const preview = previewExtractor(content, 2);
  const response = yield call(createPost, {
    body: { text: content, preview: preview },
  });
  yield put({ type: GET_RESULT, payload: response });
  const result = yield select((store) => store.writePostReducer.result);

  if (result._id) {
    yield put({
      type: SET_MESSAGE,
      payload: "Your post has been successfully created",
    });
  } else if (result.statusText) {
    yield put({
      type: SET_ERROR,
      payload: result.statusText,
    });
  }
}

export default function* writePostSaga() {
  yield takeEvery(GET_RESULT_REQUESTED, createPostGenerator);
}
