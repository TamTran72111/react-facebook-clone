import { CLEANUP_AUTH, LISTEN_AUTH, SIGN_IN, SIGN_OUT } from "../actions/types";

const INTIAL_STATE = {
  user: null,
  listener: null,
};

// eslint-disable-next-line
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, user: action.payload };
    case SIGN_OUT:
      return { ...state, user: null };
    case LISTEN_AUTH:
      return { ...state, listener: action.payload };
    case CLEANUP_AUTH:
      if (state.listener) state.listener();
      return { ...state, listener: null };
    default:
      return state;
  }
};
