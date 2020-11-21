import React from "react";
import { Link } from "react-router-dom";

import UserAvatar from "../ui/UserAvatar";
import "./Comment.css";

const Comment = ({ comment }) => {
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
        </div>
        <p>{comment.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
