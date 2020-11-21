import { EDIT_COMMENT, FETCH_POST_COMMENTS } from "../actions/types";

const INTIAL_STATE = {
  comments: {},
};

// eslint-disable-next-line
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POST_COMMENTS: {
      const comments = { ...state.comments };
      return {
        comments: {
          ...comments,
          [action.payload.postId]: action.payload.comments,
        },
      };
    }
    case EDIT_COMMENT: {
      const comments = { ...state.comments };
      const { commentId, postId, comment } = action.payload;
      const newComments = comments[postId];
      const commentIndex = newComments.findIndex(
        (comment) => comment.id === commentId
      );

      newComments[commentIndex] = { ...newComments[commentIndex], comment };

      return {
        comments: {
          ...comments,
          [postId]: [...newComments],
        },
      };
    }
    default:
      return state;
  }
};
