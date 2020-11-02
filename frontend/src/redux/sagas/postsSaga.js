import { put, call, takeEvery, select } from "redux-saga/effects";

import {
  SET_LOADING,
  GET_POSTS,
  GET_POSTS_REQUSETED,
} from "../actions/postsActions";

import { getPosts } from "../../api";

function* getPostGenerator() {
  yield put({ type: SET_LOADING });
  const currentPage = yield select((store) => store.postsReducer.currentPage);
  const response = yield call(getPosts, currentPage);
  yield put({ type: GET_POSTS, payload: response });
}

export default function* postSaga() {
  yield takeEvery(GET_POSTS_REQUSETED, getPostGenerator);
}
