import { getSelectedUser } from './user';

export const getFollow = (state) => {
  const user = getSelectedUser(state) || {};
  return state.follows.follows.find(
    (follow) => follow.following === user.userId
  );
};
export const getFollowed = (state) => {
  return getFollow(state) !== undefined;
};
