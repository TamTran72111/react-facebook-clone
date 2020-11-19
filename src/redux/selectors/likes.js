export const getLikeStatus = (state, postId) => {
  return state.likes.likes.some((like) => like.postId === postId);
};
