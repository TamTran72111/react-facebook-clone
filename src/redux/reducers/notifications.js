import {
  CLEANUP_NOTIFICATIONS,
  FETCH_NOTIFICATIONS,
  LISTEN_NOTIFICATIONS,
} from '../actions/types';

const INTIAL_STATE = {
  notifications: null,
  listener: null,
};

// eslint-disable-next-line
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return { ...state, notifications: action.payload };
    case LISTEN_NOTIFICATIONS:
      return { ...state, listener: action.payload };
    case CLEANUP_NOTIFICATIONS:
      if (state.listener) state.listener();
      return { ...state, listener: null };
    default:
      return state;
  }
};
