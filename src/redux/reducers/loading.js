import { LOADED, LOADING } from "../actions/types";

const INTIAL_STATE = {
  loading: true,
};

// eslint-disable-next-line
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case LOADING:
      return { loading: true };
    case LOADED:
      return { loading: false };
    default:
      return state;
  }
};
