export const getIsLoggedIn = (state) => state.auth.user !== null;
export const getAuthUser = (state) => state.auth.user;
