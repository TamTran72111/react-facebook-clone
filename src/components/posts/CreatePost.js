import React, { useState } from 'react';
import { connect } from 'react-redux';

import { getAuthUser } from '../../redux/selectors/auth';
import { createPostNotification } from '../../redux/actions/notifications';
import UserAvatar from '../ui/UserAvatar';
import PostModal from './PostModal';
import './CreatePost.css';
import { db, firestore } from '../../firebase';

const CreatePost = ({ user, createPostNotification }) => {
  const [post, setPost] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const toggleNewPost = () => setShowNewPost((prev) => !prev);
  const placeholder = `What's on your mind, ${user?.displayName}`;

  const createNewPost = async () => {
    const newPost = await db.collection('posts').add({
      userId: user.id,
      displayName: user.displayName,
      userAvatar: user.avatar,
      post,
      created_at: firestore.FieldValue.serverTimestamp(),
      likes: 0,
      comments: 0,
    });
    await createPostNotification(newPost.id);
    setPost('');
    setShowNewPost(false);
  };

  return (
    <div className="box">
      <div className="createPost">
        <div className="createPost__avatar">
          <UserAvatar src={user.avatar} userId={user.id} />
        </div>

        <input
          className="input is-rounded is-fullwidth"
          placeholder={placeholder}
          readOnly
          onClick={toggleNewPost}
          value={post}
        />
      </div>
      <PostModal
        title="Create Post"
        buttonText="Post"
        show={showNewPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
        close={toggleNewPost}
        placeholder={placeholder}
        buttonClick={createNewPost}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({ user: getAuthUser(state) });

export default connect(mapStateToProps, { createPostNotification })(CreatePost);
