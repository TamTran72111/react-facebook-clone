export const getCommentsByPostId = (state, postId) => {
  return state.comments.comments[postId] || [];
};
