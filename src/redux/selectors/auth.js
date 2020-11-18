export const getIsLoggedIn = (state) => state.auth.user !== null;
export const getAuthUser = (state) => state.auth.user;

export const getIsAuthor = (state, userId) => state.auth.user.id === userId;
