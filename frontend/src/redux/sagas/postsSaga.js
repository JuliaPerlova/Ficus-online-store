import { put, call, takeEvery, select } from 'redux-saga/effects';

import {
  GET_POSTS,
  GET_POSTS_REQUSETED,
  GET_POST,
  GET_POST_REQUSETED,
} from '../actions/postsActions';

import { getPosts, getPost } from '../../api';

function* getPostsGenerator() {
  const currentPage = yield select((store) => store.postsReducer.currentPage);
  console.log(currentPage);
  const response = yield call(getPosts, currentPage);
  yield put({ type: GET_POSTS, payload: response });
}

function* getPostGenerator() {
  const postId = yield select((store) => store.postsReducer.currentPostId);
  const response = yield call(getPost, postId);
  yield put({ type: GET_POST, payload: response });
}

export default function* postSaga() {
  yield takeEvery(GET_POSTS_REQUSETED, getPostsGenerator);
  yield takeEvery(GET_POST_REQUSETED, getPostGenerator);
}
