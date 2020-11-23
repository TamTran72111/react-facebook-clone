import { getAuthUser } from './auth';

export const getCommentsByPostId = (state, postId) => {
  return state.comments.comments[postId] || [];
};

export const getCommentStatus = (state, postId) => {
  const { id: userId } = getAuthUser(state);
  return getCommentsByPostId(state, postId).some(
    (comment) => comment.userId === userId
  );
};
