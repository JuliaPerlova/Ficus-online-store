import { put, call, takeEvery, select } from "redux-saga/effects";

import {
  GET_POSTS,
  GET_POSTS_REQUSETED,
  GET_POST,
  GET_POST_REQUSETED,
  SET_LIKE,
  SET_DISLIKE,
  SET_LIKE_REQUESTED,
  SET_DISLIKE_REQUESTED,
} from "../actions/postsActions";

import { getPosts, getPost, likesHandler } from "../../api";

function* getPostsGenerator() {
  const currentPage = yield select((store) => store.postsReducer.currentPage);
  const response = yield call(getPosts, currentPage);
  yield put({ type: GET_POSTS, payload: response });
}

function* getPostGenerator() {
  const postId = yield select((store) => store.postsReducer.currentPostId);
  const response = yield call(getPost, postId);
  yield put({ type: GET_POST, payload: response });
}

function* setLikeGenerator() {
  const postId = yield select((store) => store.postsReducer.currentPostId);
  const userId = localStorage.getItem("_id");
  const response = yield call(likesHandler, postId, "like", userId);
  yield put({ type: SET_LIKE, payload: response });
}

function* setDislikeGenerator() {
  const postId = yield select((store) => store.postsReducer.currentPostId);
  const userId = localStorage.getItem("_id");
  const response = yield call(likesHandler, postId, "dislike", userId);
  yield put({ type: SET_DISLIKE, payload: response });
}

export default function* postSaga() {
  yield takeEvery(GET_POSTS_REQUSETED, getPostsGenerator);
  yield takeEvery(GET_POST_REQUSETED, getPostGenerator);
  yield takeEvery(SET_LIKE_REQUESTED, setLikeGenerator);
  yield takeEvery(SET_DISLIKE_REQUESTED, setDislikeGenerator);
}
