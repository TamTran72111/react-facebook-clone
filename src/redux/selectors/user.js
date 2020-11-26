export const getSelectedUser = (state) => state.user.user;

export const getIsOwner = (state) =>
  state.user.user.userId === state.auth.user.id;
