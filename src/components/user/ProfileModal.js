import React, { useState } from 'react';
import { connect } from 'react-redux';

import BaseModal from '../ui/BaseModal';
import RequiredInput from '../ui/RequiredInput';
import UnrequiredInput from '../ui/UnrequiredInput';
import { getSelectedUser } from '../../redux/selectors/user';
import { editProfile } from '../../redux/actions/user';
import './ProfileModal.css';

const ProfileModal = ({ user, show, close, editProfile }) => {
  const [firstname, setFirstname] = useState(user?.firstname);
  const [surname, setSurname] = useState(user?.surname);
  const [displayName, setDisplayName] = useState(user?.displayName);
  const [location, setLocation] = useState(user?.location || '');
  const [bio, setBio] = useState(user?.bio || '');

  const isInvalid = displayName === '' || firstname === '' || surname === '';

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      firstname !== user.firstname ||
      surname !== user.surname ||
      displayName !== user.displayName ||
      bio !== user.bio ||
      location !== user.location
    ) {
      editProfile({
        firstname,
        surname,
        displayName,
        bio,
        location,
      });
    }
    close();
  };

  if (!show) return null;

  return (
    <BaseModal className="modal is-active profile-modal">
      <div className="modal-background" onClick={close}></div>
      <div className="modal-content">
        <div className="box">
          <div className="control has-icons-right">
            <h4 className="title is-4 has-text-centered">Edit Profile</h4>
            <span className="icon is-small is-right" onClick={close}>
              <i className="fas fa-times-circle"></i>
            </span>
          </div>

          <hr className="mb-3" />
          <form onSubmit={onSubmit}>
            <div className="doubleField">
              <RequiredInput
                type="text"
                label="First Name"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <RequiredInput
                type="text"
                label="Surname"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>

            <div className="doubleField">
              <RequiredInput
                type="text"
                label="Display name"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <UnrequiredInput
                type="text"
                label="Location"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                icon="fa-map-marker-alt has-text-info"
              />
            </div>
            <UnrequiredInput
              type="text"
              label="Bio"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <div className="field is-grouped is-justify-content-center">
              <div className="control">
                <button
                  type="submit"
                  disabled={isInvalid}
                  className="button is-link"
                >
                  Save
                </button>
              </div>
              <div className="control">
                <button onClick={close} className="button is-link is-light">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </BaseModal>
  );
};

const mapStateToProps = (state) => {
  return {
    user: getSelectedUser(state),
  };
};
export default connect(mapStateToProps, { editProfile })(ProfileModal);
