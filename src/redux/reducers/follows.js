import {
  CLEANUP_FOLLOWS,
  FETCH_FOLLOWS,
  LISTEN_FOLLOWS,
} from '../actions/types';

const INTIAL_STATE = {
  follows: [],
  listener: null,
};

// eslint-disable-next-line
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FOLLOWS:
      return { ...state, follows: action.payload };
    case LISTEN_FOLLOWS:
      return { ...state, listener: action.payload };
    case CLEANUP_FOLLOWS:
      if (state.listener) state.listener();
      return { ...state, listener: null };
    default:
      return state;
  }
};
