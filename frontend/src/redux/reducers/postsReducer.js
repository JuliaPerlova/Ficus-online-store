import {
  SET_LOADING,
  GET_CURRENT_PAGE,
  GET_INITIAL_POSTS,
  GET_POSTS,
  GET_CURRENT_POST_ID,
  GET_POST,
} from "../actions/postsActions";

const initialState = {
  loading: false,
  currentPage: 1,
  posts: [],
  currentPostId: "",
  currentPost: {},
};

const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };

    case GET_INITIAL_POSTS:
      return {
        ...state,
        posts: payload,
      };

    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
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

    default:
      return state;
  }
};

export default postsReducer;
