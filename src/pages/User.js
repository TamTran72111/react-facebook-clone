import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Profile from '../components/user/Profile';
import PostList from '../components/posts/PostList';
import { fetchUser } from '../redux/actions/user';

const User = ({ fetchUser, match }) => {
  const userId = match.params.id;
  useEffect(() => {
    fetchUser(userId);
  }, [fetchUser, userId]);

  return (
    <>
      <Profile />
      <div className="center-box">
        <PostList />
      </div>
    </>
  );
};

export default connect(null, { fetchUser })(User);
