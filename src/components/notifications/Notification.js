import React from 'react';
import { connect } from 'react-redux';
import {
  notificationType,
  removeNotification,
} from '../../redux/actions/notifications';
import './Notification.css';

const Notification = ({ notification, removeNotification }) => {
  let message;
  if (notification.type === notificationType.CREATE_NEW_POST) {
    message = 'created a new post';
  } else if (notification.type === notificationType.LIKE_POST) {
    message = 'liked your post';
  } else if (notification.type === notificationType.COMMENT_ON_POST) {
    message = 'commented on your post';
  }

  return (
    <div className="dropdown-item notification">
      <p onClick={() => removeNotification(notification.id)}>
        <strong>{notification.sender}</strong> {message}
      </p>
    </div>
  );
};

export default connect(null, { removeNotification })(Notification);
