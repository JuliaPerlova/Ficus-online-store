import {
  GET_COMMENTS,
  SET_CURRENT_COMMENT,
  WRITE_COMMENT_RESULT,
  CLEAR_TEXTAREA,
  GET_CURRENT_COMMENT_ID,
} from "../actions/commentsActions";

const initialState = {
  comments: [],
  currentComment: "",
  result: "",
  currentCommentId: "",
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

    case CLEAR_TEXTAREA:
      return {
        ...state,
        currentComment: "",
      };

    case GET_CURRENT_COMMENT_ID:
      return {
        ...state,
        currentCommentId: payload,
      };

    default:
      return state;
  }
};

export default commentsReducer;
