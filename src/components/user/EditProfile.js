import React from 'react';

import { useToggle } from '../../hooks';
import ProfileModal from './ProfileModal';

const EditProfile = () => {
  const [show, toggleShow] = useToggle();

  return (
    <>
      <span
        title="Edit Profile"
        className="icon has-text-info ml-2"
        onClick={toggleShow}
        style={{
          cursor: 'pointer',
          fontSize: '1.3rem',
          transform: 'translateY(-3px)',
        }}
      >
        <i className="fas fa-pencil-alt"></i>
      </span>

      <ProfileModal show={show} close={toggleShow} />
    </>
  );
};

export default EditProfile;
