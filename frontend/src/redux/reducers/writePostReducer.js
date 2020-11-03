import {
  GET_CONTENT,
  SET_LOADING,
  GET_RESULT,
  SET_MESSAGE,
  SET_ERROR,
  CLEAR_STORE,
  POST_IS_CREATED,
} from "../actions/writePostActions";

const initialState = {
  loading: false,
  content: "Write something ...",
  message: "",
  error: "",
  result: {},
  isCreated: false,
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

    case POST_IS_CREATED:
      return {
        ...state,
        isCreated: true,
      };

    case CLEAR_STORE:
      return {
        ...state,
        content: "Write something ...",
        preview: "",
        message: "",
        result: {},
        isCreated: false,
      };

    default:
      return state;
  }
};

export default writePostReducer;
