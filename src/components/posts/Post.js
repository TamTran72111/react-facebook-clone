import React from "react";

import UserAvatar from "../ui/UserAvatar";
import "./Post.css";

const Post = ({ post }) => {
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
    </div>
  );
};

export default Post;
