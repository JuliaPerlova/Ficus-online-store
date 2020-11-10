import { GET_PROFILE_INFO } from "../actions/profileActions";

const initialState = {
  profileInfo: {},
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROFILE_INFO:
      return {
        ...state,
        profileInfo: payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
