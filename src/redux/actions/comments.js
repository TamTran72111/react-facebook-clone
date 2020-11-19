import { db, firestore } from "../../firebase";
import { getAuthUser } from "../selectors/auth";

const Comments = db.collection("comments");
const Posts = db.collection("posts");

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
};
