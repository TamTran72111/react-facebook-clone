import React from "react";
import { connect } from "react-redux";

import { getPosts } from "../../redux/selectors/posts";
import Post from "./Post";

const PostList = ({ posts }) => {
  console.log(posts);
  if (posts.length === 0) {
    return <div className="box my-3">There is no post</div>;
  }
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

const mapStateToProps = (state) => ({ posts: getPosts(state) });

export default connect(mapStateToProps)(PostList);
