export const getLikeStatus = (state, postId) => {
  return state.likes.likes.some((like) => like.postId === postId);
};

export const findLike = (state, postId) => {
  return state.likes.likes.find((like) => like.postId === postId);
};
