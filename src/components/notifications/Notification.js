import React from 'react';
import { notificationType } from '../../redux/actions/notifications';
import './Notification.css';

const Notification = ({ notification }) => {
  let message;
  if (notification.type === notificationType.CREATE_NEW_POST) {
    message = 'created a new post';
  }

  return (
    <div className="dropdown-item notification">
      <p>
        <strong>{notification.sender}</strong> {message}
      </p>
    </div>
  );
};

export default Notification;
