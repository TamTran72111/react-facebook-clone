import { db } from "../../firebase";
import { fetchPostComments } from "./comments";
import { CLEANUP_POSTS, FETCH_POSTS, LISTEN_POSTS } from "./types";

const Posts = db.collection("posts");

export const fetchAllPosts = () => (dispatch) => {
  const unsubscribe = Posts.orderBy("created_at", "desc").onSnapshot(
    (snapshot) => {
      // Update posts on snapshot change
      const posts = snapshot.docs.map((post) => ({
        id: post.id,
        ...post.data(),
      }));
      dispatch({ type: FETCH_POSTS, payload: posts });

      // Fetch comments for changed posts (added and modified only)
      snapshot.docChanges().forEach((change) => {
        if (change.type === "modified" || change.type === "added") {
          fetchPostComments(dispatch, change.doc.id);
        }
      });
    }
  );
  dispatch({ type: LISTEN_POSTS, payload: unsubscribe });
};

export const cleanupPosts = () => (dispatch) => {
  dispatch({ type: CLEANUP_POSTS });
};
