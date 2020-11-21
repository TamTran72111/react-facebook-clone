import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import UserAvatar from "../ui/UserAvatar";
import EditAndDelete from "../ui/EditAndDelete";
import { getIsAuthor } from "../../redux/selectors/auth";
import { editComment } from "../../redux/actions/comments";
import { useToggle } from "../../hooks";
import "./Comment.css";

const Comment = ({ comment, editComment }) => {
  const [showEdit, toggleEdit] = useToggle();
  const [showDelete, toggleDelete] = useToggle();
  const [editedComment, setEditedComment] = useState("");

  useEffect(() => {
    if (!showEdit) {
      setEditedComment(comment.comment);
    }
  }, [showEdit, comment.comment]);

  const onKeyUp = (e) => {
    if (e.code === "Escape") {
      toggleEdit();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editedComment !== "") {
      editComment({
        comment: editedComment,
        commentId: comment.id,
        postId: comment.postId,
      });
      toggleEdit();
    }
  };

  return (
    <div className="comment mt-2">
      <div className="comment__avatar">
        <UserAvatar
          src={comment.userAvatar}
          userId={comment.userId}
          type="comment"
        />
      </div>
      <div className="comment__content">
        <div>
          <Link to={`/users/${comment.userId}`}>
            <h6 className="title is-6">{comment.displayName}</h6>
          </Link>
          <EditAndDelete
            isAuthor="isAuthor"
            toggleEdit={toggleEdit}
            toggleDelete={toggleDelete}
          />
        </div>
        {showEdit ? (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="input is-rounded"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              onKeyUp={onKeyUp}
            />
          </form>
        ) : (
          <p>{comment.comment}</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { isAuthor: getIsAuthor(state, ownProps.comment.userId) };
};

export default connect(mapStateToProps, { editComment })(Comment);
