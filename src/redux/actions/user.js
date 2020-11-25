import { db, storage } from '../../firebase';
import { getSelectedUser } from '../selectors/user';
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

export const updateAvatar = (imageFile) => async (dispatch, getState) => {
  const user = getSelectedUser(getState()); // Also the authenticated user
  const fileExtension = imageFile.type.substr(6, 10);
  const fileName = `avatars/${user.userId}.${fileExtension}`;
  await storage.ref(fileName).put(imageFile);
  const userAvatar = await storage.ref(fileName).getDownloadURL();
  if (user.userAvatar !== userAvatar) {
    await Users.doc(user.userId).update({ avatar: userAvatar });
    dispatch({
      type: FETCH_USER,
      payload: {
        ...user,
        avatar: userAvatar,
      },
    });
  }
};
