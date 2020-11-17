import {
  GET_PROFILE_INFO,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_LOADING,
  GET_AVATAR_ID,
  GET_AVATAR_URL,
  SET_FILE,
} from "../actions/profileActions";

const initialState = {
  profileInfo: {},
  modalIsOpen: false,
  loading: false,
  file: null,
  avatarId: "",
  avatarUrl: "",
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROFILE_INFO:
      return {
        ...state,
        profileInfo: payload,
      };

    case OPEN_MODAL:
      return {
        ...state,
        modalIsOpen: true,
      };

    case CLOSE_MODAL:
      return {
        ...state,
        modalIsOpen: false,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_AVATAR_ID:
      return {
        ...state,
        avatarId: payload,
      };

    case GET_AVATAR_URL:
      return {
        ...state,
        avatarUrl: payload,
        loading: false,
      };

    case SET_FILE:
      return {
        ...state,
        file: payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
