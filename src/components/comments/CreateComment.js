import React, { useState } from "react";
import { connect } from "react-redux";
import { createComment } from "../../redux/actions/comments";

import { getAuthUser } from "../../redux/selectors/auth";
import UserAvatar from "../ui/UserAvatar";
import "./CreateComment.css";

const CreateComment = ({ user, postId, createComment }) => {
  const [comment, setComment] = useState("");

  const createNewComment = (e) => {
    e.preventDefault();
    createComment(postId, comment);
    setComment("");
  };

  return (
    <div className="createComment mt-2">
      <div className="createComment__avatar">
        <UserAvatar src={user.avatar} userId={user.id} type="comment" />
      </div>
      <form onSubmit={createNewComment} style={{ width: "100%" }}>
        <input
          className="input is-rounded"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="is-hidden" type="submit"></button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: getAuthUser(state) };
};
export default connect(mapStateToProps, { createComment })(CreateComment);
