import { FETCH_LIKES, LIKE_POST, UNLIKE_POST } from "../actions/types";

const INTIAL_STATE = {
  likes: [],
};

// eslint-disable-next-line
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LIKES:
      return { likes: action.payload };
    case LIKE_POST:
      return { likes: [...state.likes, action.payload] };
    case UNLIKE_POST:
      return {
        likes: state.likes.filter((like) => like.id !== action.payload),
      };
    default:
      return state;
  }
};
