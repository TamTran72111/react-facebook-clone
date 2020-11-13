import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INTIAL_STATE = {
  user: null,
};

// eslint-disable-next-line
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { user: action.payload };
    case SIGN_OUT:
      return { user: null };
    default:
      return state;
  }
};
