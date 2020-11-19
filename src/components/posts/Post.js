import React, { useState } from "react";
import { connect } from "react-redux";

import PostModal from "./PostModal";
import UserAvatar from "../ui/UserAvatar";
import EditAndDelete from "../ui/EditAndDelete";
import ConfirmationModal from "../ui/ConfirmationModal";
import { getIsAuthor } from "../../redux/selectors/auth";
import { db } from "../../firebase";
import "./Post.css";

const Post = ({ post, isAuthor }) => {
  const [showEditPost, setShowEditPost] = useState(false);
  const [editedPost, setEditedPost] = useState(post.post);
  const [showDelete, setShowDelete] = useState(false);

  const toggleEditPost = () => {
    if (showEditPost) {
      setEditedPost(post.post);
    }
    setShowEditPost(!showEditPost);
  };

  const editPost = () => {
    db.collection("posts").doc(post.id).update({ post: editedPost });
    setShowEditPost(false);
  };

  const toggleDelete = () => setShowDelete((prev) => !prev);

  const confirmDelete = () => {
    db.collection("posts").doc(post.id).delete();
    setShowDelete(false);
  };

  const created_at = new Date(post.created_at.seconds * 1000);
  const date = `${created_at.toLocaleTimeString()} ${created_at.toLocaleDateString()}`;

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
            <span className="icon has-text-danger">
              <i className="far fa-heart"></i>
            </span>

            <span>{post.likes} Likes</span>
          </div>
          <div>
            <span className="icon has-text-info">
              <i className="far fa-comment"></i>
            </span>
            <span>{post.comments} Comments</span>
          </div>
        </div>
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
});

export default connect(mapStateToProps)(Post);
