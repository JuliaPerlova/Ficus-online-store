import {
  GET_CONTENT,
  GET_PREVIEW,
  SET_LOADING,
  GET_RESULT,
} from "../actions/writePostActions";

const initialState = {
  loading: false,
  content: "",
  preview: "",
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

    case GET_PREVIEW:
      return {
        ...state,
        preview: payload,
      };

    case GET_RESULT:
      return {
        ...state,
        loading: false,
        result: payload,
      };

    default:
      return state;
  }
};

export default writePostReducer;
