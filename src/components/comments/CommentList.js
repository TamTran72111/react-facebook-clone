import React from "react";
import { connect } from "react-redux";

import { getCommentsByPostId } from "../../redux/selectors/comments";
import Comment from "./Comment";
import "./CommentList.css";

const CommentList = ({ comments, show, toggle }) => {
  return (
    <>
      {show && (
        <div>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      {comments?.length > 0 && (
        <div onClick={toggle} className="viewComments">
          <span>{show ? "Hide" : "Views"} comments</span>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { comments: getCommentsByPostId(state, ownProps.postId) };
};

export default connect(mapStateToProps)(CommentList);
