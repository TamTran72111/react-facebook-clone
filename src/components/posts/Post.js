import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import PostModal from './PostModal';
import UserAvatar from '../ui/UserAvatar';
import EditAndDelete from '../ui/EditAndDelete';
import ConfirmationModal from '../ui/ConfirmationModal';
import CreateComment from '../comments/CreateComment';
import CommentList from '../comments/CommentList';
import { likePost, unlikePost } from '../../redux/actions/likes';
import { getAuthUser, getIsAuthor } from '../../redux/selectors/auth';
import { getLikeStatus } from '../../redux/selectors/likes';
import { db } from '../../firebase';
import { useToggle } from '../../hooks';
import './Post.css';
import { getCommentStatus } from '../../redux/selectors/comments';

const Post = ({ post, isAuthor, likePost, unlikePost, liked, commented }) => {
  const [editedPost, setEditedPost] = useState(post.post);
  const [showEditPost, toggleEditPost] = useToggle();
  const [showDelete, toggleDelete] = useToggle();
  const [showComments, toggleShowComments] = useToggle();

  useEffect(() => {
    if (!showEditPost) {
      setEditedPost(post.post);
    }
  }, [showEditPost, post.post]);

  const editPost = () => {
    db.collection('posts').doc(post.id).update({ post: editedPost });
    toggleEditPost();
  };

  const confirmDelete = () => {
    db.collection('posts').doc(post.id).delete();
    toggleDelete();
  };

  const toggleLike = () => {
    if (!liked) {
      likePost(post.id);
    } else {
      unlikePost(post.id);
    }
  };

  let created_at;
  if (post.created_at) {
    created_at = new Date(post.created_at.seconds * 1000);
  } else {
    // Backup plan in case created_at is null
    created_at = new Date();
  }
  const date = `${created_at.toLocaleTimeString()} ${created_at.toLocaleDateString()}`;

  const onCreateComment = () => {
    if (!showComments) {
      toggleShowComments();
    }
  };

  return (
    <div className="card my-3 post">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <UserAvatar src={post.userAvatar} userId={post.userId} />
          </div>
          <div className="media-content">
            <p className="title is-4">{post.displayName}</p>
            <p className="subtitle is-6">{date}</p>
          </div>

          <EditAndDelete
            isAuthor={isAuthor}
            toggleEdit={toggleEditPost}
            toggleDelete={toggleDelete}
          />
        </div>

        <div className="content">{post.post}</div>
        <hr />
        <div className="iteractions">
          <div>
            <span onClick={toggleLike} className="icon has-text-danger">
              <i className={`${liked ? 'fas' : 'far'} fa-heart`}></i>
            </span>

            <span>{post.likes} Likes</span>
          </div>
          <div>
            <span onClick={toggleShowComments} className="icon has-text-info">
              <i className={`${commented ? 'fas' : 'far'} fa-comment`}></i>
            </span>
            <span>{post.comments} Comments</span>
          </div>
        </div>
        <CommentList
          postId={post.id}
          show={showComments}
          toggle={toggleShowComments}
        />
        <CreateComment postId={post.id} onCreateComment={onCreateComment} />
      </div>

      {/* Edit Post */}
      <PostModal
        title="Edit Post"
        buttonText="Edit"
        buttonClick={editPost}
        show={showEditPost}
        value={editedPost}
        onChange={(e) => setEditedPost(e.target.value)}
        close={toggleEditPost}
      />

      {/* Delete Post */}

      <ConfirmationModal
        show={showDelete}
        close={toggleDelete}
        confirm={confirmDelete}
        isDelete
        title="Delete Post"
        buttonText="Delete"
      >
        Are your sure that you want to delete this post?
      </ConfirmationModal>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isAuthor: getIsAuthor(state, ownProps.post.userId),
  userId: getAuthUser(state).id,
  liked: getLikeStatus(state, ownProps.post.id),
  commented: getCommentStatus(state, ownProps.post.id),
});

export default connect(mapStateToProps, { likePost, unlikePost })(Post);
