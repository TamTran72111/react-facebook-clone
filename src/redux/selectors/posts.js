export const getPosts = (state) => state.posts.posts;
export const getPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);
