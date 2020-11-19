import { db, firestore } from "../../firebase";
import { getAuthUser } from "../selectors/auth";
import { FETCH_LIKES, LIKE_POST } from "./types";

const Likes = db.collection("likes");

export const fetchLikes = async (dispatch, userId) => {
  const likes = await Likes.where("userId", "==", userId).get();

  dispatch({
    type: FETCH_LIKES,
    payload: likes.docs.map((like) => ({ id: like.id, ...like.data() })),
  });
};

export const likePost = (postId) => (dispatch, getState) => {
  const userId = getAuthUser(getState()).id;
  const batch = db.batch();
  // Increase like count
  batch.update(db.collection("posts").doc(postId), {
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
};
