import {
  GET_CURRENT_PAGE,
  GET_POSTS,
  GET_CURRENT_POST_ID,
  GET_POST,
  SET_LIKE,
  SET_DISLIKE,
} from "../actions/postsActions";

const initialState = {
  currentPage: 1,
  posts: [],
  currentPostId: "",
  currentPost: {},
  like: {},
  dislike: {},
};

const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };

    case GET_POSTS:
      return {
        ...state,
        posts: payload,
      };

    case GET_CURRENT_POST_ID:
      return {
        ...state,
        currentPostId: payload,
      };

    case GET_POST:
      return {
        ...state,
        currentPost: payload,
      };

    case SET_LIKE:
      return {
        ...state,
        like: payload,
      };

    case SET_DISLIKE:
      return {
        ...state,
        dislike: payload,
      };

    default:
      return state;
  }
};

export default postsReducer;
