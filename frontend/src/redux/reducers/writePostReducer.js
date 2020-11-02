import {
  GET_CONTENT,
  SET_LOADING,
  GET_RESULT,
  SET_MESSAGE,
  SET_ERROR,
  CLEAR_STORE,
} from "../actions/writePostActions";

const initialState = {
  loading: false,
  content: "Write something ...",
  message: "",
  error: "",
  result: {},
};

const writePostReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_CONTENT:
      return {
        ...state,
        content: payload,
      };

    case GET_RESULT:
      return {
        ...state,
        loading: false,
        result: payload,
      };

    case SET_MESSAGE:
      return {
        ...state,
        message: payload,
      };

    case SET_ERROR:
      return {
        ...state,
        error: payload,
      };

    case CLEAR_STORE:
      return {
        ...state,
        content: "Write something ...",
        preview: "",
        message: "",
        result: {},
      };

    default:
      return state;
  }
};

export default writePostReducer;
