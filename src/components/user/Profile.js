import React from 'react';
import { connect } from 'react-redux';

import { useToggle } from '../../hooks';
import { getIsOwner, getSelectedUser } from '../../redux/selectors/user';
import { follow, unfollow } from '../../redux/actions/follows';
import UploadAvatar from './UploadAvatar';

import './Profile.css';
import EditProfile from './EditProfile';
import { getFollowed } from '../../redux/selectors/follows';

const Profile = ({ user, isOnwer, followed, follow, unfollow }) => {
  const [showUploadAvatar, toggleUploadAvatar] = useToggle();

  if (!user) {
    return null;
  }
  const fullname = `${user.firstname} ${user.surname}`;

  const date = new Date(user.created_at.seconds * 1000);
  const joinedDate = `Joined ${date.toLocaleDateString()}`;

  return (
    <div className="profile box py-5 has-background-white has-text-centered">
      <div
        className="image-wrapper mt-1"
        onClick={toggleUploadAvatar}
        style={isOnwer ? { cursor: 'pointer' } : null}
      >
        <figure className="image">
          <img className="is-rounded" src={user.avatar} alt="User avatar" />
        </figure>
      </div>
      {isOnwer && (
        <UploadAvatar show={showUploadAvatar} close={toggleUploadAvatar} />
      )}
      <h3 className="title is-3 mt-2 mb-0">
        {user.displayName}
        {isOnwer && <EditProfile />}
      </h3>
      {fullname !== user.displayName && <div>({fullname})</div>}

      <div className="info mt-3 pt-2 pb-1 is-5">
        {user.bio && <div>{user.bio}</div>}

        {user.location && (
          <div>
            <span className="icon has-text-info">
              <i className="fas fa-map-marker-alt"></i>
            </span>
            {user.location}
          </div>
        )}
        <div>
          <span className="icon has-text-info">
            <i className="far fa-calendar"></i>
          </span>
          {joinedDate}
        </div>
      </div>
      {!isOnwer && (
        <div className="follow">
          {followed ? (
            <button
              className="button is-primary is-outlined"
              onClick={unfollow}
            >
              Unfollow
            </button>
          ) : (
            <button className="button is-primary" onClick={follow}>
              Follow
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: getSelectedUser(state),
    isOnwer: getIsOwner(state),
    followed: getFollowed(state),
  };
};

export default connect(mapStateToProps, { follow, unfollow })(Profile);
