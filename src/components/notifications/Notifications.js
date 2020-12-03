import React from 'react';
import { connect } from 'react-redux';

import { getNotifications } from '../../redux/selectors/notificications';
import { useToggle } from '../../hooks';
import Notification from './Notification';
import './Notifications.css';

const Notifications = ({ notifications }) => {
  const [show, toggleShow] = useToggle();

  const hasNotifications = notifications.length > 0;

  return (
    <div className="dropdown is-active notifications">
      <div className="dropdown-trigger" onClick={toggleShow}>
        <span className="icon is-small is-size-4">
          <i className="fas fa-bell"></i>
        </span>
        {hasNotifications && (
          <span className="notifications-count">{notifications.length}</span>
        )}
      </div>
      {show && hasNotifications && (
        <div className="dropdown-menu py-0">
          <div className="dropdown-content py-0">
            {notifications.map((notification) => (
              <Notification key={notification.id} notification={notification} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  notifications: getNotifications(state),
});

export default connect(mapStateToProps)(Notifications);
