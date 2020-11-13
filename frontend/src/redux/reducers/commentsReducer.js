import {
  GET_COMMENTS,
  SET_CURRENT_COMMENT,
  WRITE_COMMENT_RESULT,
  CLEAR_COMMENT_TEXTAREA,
  GET_CURRENT_COMMENT_ID,
  SET_CURRENT_REPLY,
  WRITE_REPLY_RESULT,
  CLEAR_REPLY_TEXTAREA,
} from "../actions/commentsActions";

const initialState = {
  comments: [],
  currentComment: "",
  result: false,
  currentCommentId: "",
  currentReply: "",
  replyResult: false,
};

const commentsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: payload,
      };

    case SET_CURRENT_COMMENT:
      return {
        ...state,
        currentComment: payload,
      };

    case WRITE_COMMENT_RESULT:
      return {
        ...state,
        result: payload,
      };

    case CLEAR_COMMENT_TEXTAREA:
      return {
        ...state,
        currentComment: "",
      };

    case GET_CURRENT_COMMENT_ID:
      return {
        ...state,
        currentCommentId: payload,
      };

    case SET_CURRENT_REPLY:
      return {
        ...state,
        currentReply: payload,
      };

    case WRITE_REPLY_RESULT:
      return {
        ...state,
        replyResult: payload,
      };

    case CLEAR_REPLY_TEXTAREA:
      return {
        ...state,
        currentReply: "",
      };

    default:
      return state;
  }
};

export default commentsReducer;
