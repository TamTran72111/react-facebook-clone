import { db, firestore } from '../../firebase';
import { getAuthUser } from '../selectors/auth';
import { findLike } from '../selectors/likes';
import { createLikeNotification } from './notifications';
import { FETCH_LIKES, LIKE_POST, UNLIKE_POST } from './types';

const Likes = db.collection('likes');
const Posts = db.collection('posts');

export const fetchLikes = async (dispatch, userId) => {
  const likes = await Likes.where('userId', '==', userId).get();

  dispatch({
    type: FETCH_LIKES,
    payload: likes.docs.map((like) => ({ id: like.id, ...like.data() })),
  });
};

export const likePost = (postId) => (dispatch, getState) => {
  const userId = getAuthUser(getState()).id;
  const batch = db.batch();
  // Increase like count
  batch.update(Posts.doc(postId), {
    likes: firestore.FieldValue.increment(1),
  });
  // Create like document
  const newLike = {
    userId,
    postId,
  };
  const newLikeDoc = Likes.doc();
  batch.set(newLikeDoc, {
    ...newLike,
    created_at: firestore.FieldValue.serverTimestamp(),
  });
  batch.commit();
  dispatch({ type: LIKE_POST, payload: { id: newLikeDoc.id, ...newLike } });

  createLikeNotification(postId, getState);
};

export const unlikePost = (postId) => (dispatch, getState) => {
  const like = findLike(getState(), postId);

  const batch = db.batch();
  // Decrease like count
  batch.update(Posts.doc(postId), {
    likes: firestore.FieldValue.increment(-1),
  });
  // Delete like document
  batch.delete(Likes.doc(like.id));
  batch.commit();
  dispatch({ type: UNLIKE_POST, payload: like.id });
};
