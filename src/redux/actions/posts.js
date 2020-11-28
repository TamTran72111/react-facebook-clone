import { db } from '../../firebase';
import { fetchPostComments } from './comments';
import { CLEANUP_POSTS, FETCH_POSTS, LISTEN_POSTS } from './types';

const Posts = db.collection('posts');

const fetchPosts = (dispatch, PostCollection = Posts) => {
  const unsubscribe = PostCollection.orderBy('created_at', 'desc').onSnapshot(
    (snapshot) => {
      // Update posts on snapshot change
      const posts = snapshot.docs.map((post) => ({
        id: post.id,
        ...post.data(),
      }));
      dispatch({ type: FETCH_POSTS, payload: posts });

      // Fetch comments for changed posts (added and modified only)
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified' || change.type === 'added') {
          setTimeout(() => fetchPostComments(dispatch, change.doc.id), 100);
        }
      });
    }
  );
  dispatch({ type: LISTEN_POSTS, payload: unsubscribe });
};

export const fetchAllPosts = () => (dispatch) => {
  fetchPosts(dispatch, Posts);
};

export const fetchUserPosts = (dispatch, userId) => {
  const PostCollection = Posts.where('userId', '==', userId);
  fetchPosts(dispatch, PostCollection);
};

export const cleanupPosts = () => (dispatch) => {
  dispatch({ type: CLEANUP_POSTS });
};

export const updateUserInfoForPosts = async (userId, updatedInfo) => {
  const posts = await Posts.where('userId', '==', userId).get();
  const batch = db.batch();
  posts.docs.forEach((post) => {
    batch.update(post.ref, updatedInfo);
  });
  await batch.commit();
};
