import { SET_ACCESS_TOKEN, DELETE_TOKEN } from "../actions/authActions";

const initialState = {
  isAuth: localStorage.getItem("accessToken"),
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        isAuth: payload,
      };

    case DELETE_TOKEN:
      return {
        ...state,
        isAuth: null,
      };

    default:
      return state;
  }
};

export default authReducer;
