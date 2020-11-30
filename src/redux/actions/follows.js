import { db } from '../../firebase';
import { getAuthUser } from '../selectors/auth';
import { getSelectedUser } from '../selectors/user';
import { CLEANUP_FOLLOWS, FETCH_FOLLOWS, LISTEN_FOLLOWS } from './types';

const Follows = db.collection('follows');

export const follow = () => async (_, getState) => {
  const state = getState();
  const authUser = getAuthUser(state);
  const selectedUser = getSelectedUser(state);

  await Follows.add({
    follower: authUser.id,
    following: selectedUser.userId,
  });
};

export const fetchFollows = (dispatch, userId) => {
  const followListener = Follows.where('follower', '==', userId).onSnapshot(
    (follows) => {
      dispatch({
        type: FETCH_FOLLOWS,
        payload: follows.docs.map((follow) => ({
          id: follow.id,
          ...follow.data(),
        })),
      });
    }
  );

  dispatch({
    type: LISTEN_FOLLOWS,
    payload: followListener,
  });
};

export const cleanupFollows = (dispatch) => {
  dispatch({ type: CLEANUP_FOLLOWS });
};
