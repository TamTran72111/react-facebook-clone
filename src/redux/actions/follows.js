import { db } from '../../firebase';
import { getAuthUser } from '../selectors/auth';
import { getSelectedUser } from '../selectors/user';

const Follows = db.collection('follows');

export const follow = () => async (dispatch, getState) => {
  const state = getState();
  const authUser = getAuthUser(state);
  const selectedUser = getSelectedUser(state);

  await Follows.add({
    follower: authUser.id,
    following: selectedUser.userId,
  });
};
