import { db, firestore } from '../../firebase';
import { getAuthUser } from '../selectors/auth';
import {
  CLEANUP_NOTIFICATIONS,
  FETCH_NOTIFICATIONS,
  LISTEN_NOTIFICATIONS,
} from './types';

const Notifications = db.collection('notifications');

export const notificationType = {
  CREATE_NEW_POST: 'CREATE_NEW_POST',
};

export const createPostNotification = (postId) => async (_, getState) => {
  const { id: userId, displayName } = getAuthUser(getState());
  const follows = await db
    .collection('follows')
    .where('following', '==', userId)
    .get();
  const batch = db.batch();
  follows.docs.forEach((follow) => {
    const docRef = Notifications.doc();
    batch.set(docRef, {
      postId,
      sender: displayName,
      receiver: follow.data().follower,
      type: notificationType.CREATE_NEW_POST,
      created_at: firestore.FieldValue.serverTimestamp(),
    });
  });
  batch.commit();
};

export const fetchNotifications = (dispatch, userId) => {
  const listener = Notifications.where('receiver', '==', userId)
    .orderBy('created_at', 'desc')
    .onSnapshot((snapshot) => {
      dispatch({
        type: FETCH_NOTIFICATIONS,
        payload: snapshot.docs.map((notification) => ({
          id: notification.id,
          ...notification.data(),
        })),
      });
    });
  dispatch({
    type: LISTEN_NOTIFICATIONS,
    payload: listener,
  });
};

export const cleanupNotifications = (dispatch) => {
  dispatch({ type: CLEANUP_NOTIFICATIONS });
};
