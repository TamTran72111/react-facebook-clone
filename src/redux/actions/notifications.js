import { db, firestore } from '../../firebase';
import { getAuthUser } from '../selectors/auth';

const Notifications = db.collection('notifications');
const notificationType = {
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
