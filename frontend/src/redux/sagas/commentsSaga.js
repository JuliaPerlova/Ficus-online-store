import { put, call, takeEvery, select } from "redux-saga/effects";

import {
  GET_COMMENTS,
  GET_COMMENTS_REQUESTED,
  WRITE_COMMENT_RESULT,
  WRITE_COMMENT_REQUESTED,
  CLEAR_COMMENT_TEXTAREA,
  WRITE_REPLY_REQUESTED,
  WRITE_REPLY_RESULT,
  CLEAR_REPLY_TEXTAREA,
} from "../actions/commentsActions";

import { getComments, writeComment } from "../../api";

function* getCommentsGenerator() {
  const postId = yield select((store) => store.postsReducer.currentPostId);
  const comments = yield call(getComments, postId);
  yield put({ type: GET_COMMENTS, payload: comments });
}

function* writeCommentGenerator() {
  const postId = yield select((store) => store.postsReducer.currentPostId);
  const content = yield select((store) => store.commentsReducer.currentComment);
  const response = yield call(writeComment, postId, content);
  yield put({ type: WRITE_COMMENT_RESULT, payload: response });
  yield put({ type: CLEAR_COMMENT_TEXTAREA });
}

function* writeReplyGenerator() {
  const postId = yield select((store) => store.postsReducer.currentPostId);
  const content = yield select((store) => store.commentsReducer.currentReply);
  const commentId = yield select(
    (store) => store.commentsReducer.currentCommentId
  );
  const response = yield call(writeComment, postId, content, commentId);
  yield put({ type: WRITE_REPLY_RESULT, payload: response });
  yield put({ type: CLEAR_REPLY_TEXTAREA });
}

export default function* commentsSaga() {
  yield takeEvery(GET_COMMENTS_REQUESTED, getCommentsGenerator);
  yield takeEvery(WRITE_COMMENT_REQUESTED, writeCommentGenerator);
  yield takeEvery(WRITE_REPLY_REQUESTED, writeReplyGenerator);
}
