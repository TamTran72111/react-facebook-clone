import { FETCH_POST_COMMENTS } from "../actions/types";

const INTIAL_STATE = {
  comments: {},
};

// eslint-disable-next-line
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POST_COMMENTS:
      const comments = { ...state.comments };
      comments[action.payload.postId] = action.payload.comments;
      return { comments };
    default:
      return state;
  }
};
