import { db, firestore } from '../../firebase';
import { getAuthUser } from '../selectors/auth';
import { createCommentNotification } from './notifications';
import { EDIT_COMMENT, FETCH_POST_COMMENTS } from './types';

const Comments = db.collection('comments');
const Posts = db.collection('posts');

export const createComment = (postId, comment) => (_, getState) => {
  const user = getAuthUser(getState());
  const batch = db.batch();
  // Increase comment count
  batch.update(Posts.doc(postId), {
    comments: firestore.FieldValue.increment(1),
  });
  // Create comment document
  batch.set(Comments.doc(), {
    postId,
    comment,
    userId: user.id,
    displayName: user.displayName,
    userAvatar: user.avatar,
    created_at: firestore.FieldValue.serverTimestamp(),
  });
  batch.commit();

  createCommentNotification(postId, getState);
};

export const fetchPostComments = async (dispatch, postId) => {
  const comments = await Comments.where('postId', '==', postId)
    .orderBy('created_at', 'asc')
    .get();

  dispatch({
    type: FETCH_POST_COMMENTS,
    payload: {
      postId,
      comments: comments.docs.map((comment) => ({
        id: comment.id,
        ...comment.data(),
      })),
    },
  });
};

export const editComment = (payload) => (dispatch) => {
  Comments.doc(payload.commentId).update({ comment: payload.comment });
  dispatch({ type: EDIT_COMMENT, payload });
};

export const deleteComment = (commentId, postId) => () => {
  const batch = db.batch();
  batch.delete(Comments.doc(commentId));
  batch.update(Posts.doc(postId), {
    comments: firestore.FieldValue.increment(-1),
  });
  batch.commit();
};

export const updateUserInfoForComments = async (userId, updatedInfo) => {
  const comments = await Comments.where('userId', '==', userId).get();
  const batch = db.batch();
  comments.docs.forEach((comment) => {
    batch.update(comment.ref, updatedInfo);
  });
  await batch.commit();
};
