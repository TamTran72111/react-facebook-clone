import { CLEANUP_POSTS, FETCH_POSTS, LISTEN_POSTS } from "../actions/types";

const INTIAL_STATE = {
  posts: [],
  listener: null,
};

// eslint-disable-next-line
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, posts: action.payload };
    case LISTEN_POSTS:
      return { ...state, listener: action.payload };
    case CLEANUP_POSTS:
      if (state.listener) state.listener();
      return INTIAL_STATE;
    default:
      return state;
  }
};
