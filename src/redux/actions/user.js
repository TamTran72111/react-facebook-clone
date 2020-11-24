import { db } from '../../firebase';
import { FETCH_USER } from './types';

const Users = db.collection('users');

export const fetchUser = (userId) => async (dispatch) => {
  const user = await Users.doc(userId).get();
  dispatch({
    type: FETCH_USER,
    payload: {
      userId,
      ...user.data(),
    },
  });
};
