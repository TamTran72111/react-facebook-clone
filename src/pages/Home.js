import React, { useEffect } from "react";
import { connect } from "react-redux";

import CreatePost from "../components/posts/CreatePost";
import PostList from "../components/posts/PostList";
import { fetchAllPosts, cleanupPosts } from "../redux/actions/posts";

const Home = ({ fetchAllPosts, cleanupPosts }) => {
  useEffect(() => {
    fetchAllPosts();
    return () => {
      cleanupPosts();
    };
  }, [fetchAllPosts, cleanupPosts]);

  return (
    <div className="center-box">
      <CreatePost />
      <PostList />
    </div>
  );
};

export default connect(null, { fetchAllPosts, cleanupPosts })(Home);
