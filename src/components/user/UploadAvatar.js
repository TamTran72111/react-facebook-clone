import React, { useState } from 'react';
import { connect } from 'react-redux';

import BaseModal from '../ui/BaseModal';
import { updateAvatar } from '../../redux/actions/user';
import './UploadAvatar.css';

const UploadAvatar = ({ show, close, updateAvatar }) => {
  const [fileName, setFileName] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [file, setFile] = useState(null);
  const onClose = () => {
    setImageSrc('');
    setFileName('');
    close();
  };

  const upload = async (e) => {
    e.preventDefault();
    await updateAvatar(file);
    onClose();
  };

  const onChange = ({ target }) => {
    if (target.files[0] && target.files[0].type.startsWith('image/')) {
      setImageSrc(URL.createObjectURL(target.files[0]));
      setFileName(target.files[0].name);
      setFile(target.files[0]);
    } else {
      setFile(null);
    }
  };

  if (!show) return null;

  return (
    <BaseModal className="modal is-active upload-avatar">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <div className="control has-icons-right">
            <h4 className="title is-4 has-text-centered">Upload Avatar</h4>
            <span className="icon is-small is-right" onClick={onClose}>
              <i className="fas fa-times-circle"></i>
            </span>
          </div>

          <hr className="mb-3" />

          {imageSrc !== '' && (
            <div className="previewAvatar" title="Preview Avatar">
              <img src={imageSrc} alt="Preview Avatar" />
            </div>
          )}

          <form onSubmit={upload} className="my-2">
            <div className={`file ${fileName !== '' ? 'has-name' : ''}`}>
              <label className="file-label">
                <input className="file-input" type="file" onChange={onChange} />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label"> Choose an image... </span>
                </span>
                {fileName !== '' && (
                  <span className="file-name">{fileName}</span>
                )}
              </label>
            </div>

            <div className="field is-grouped is-justify-content-center mt-3">
              <div className="control">
                <button
                  type="submit"
                  disabled={!file}
                  className="button is-link"
                >
                  Save
                </button>
              </div>
              <div className="control">
                <button onClick={onClose} className="button is-link is-light">
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

export default connect(null, { updateAvatar })(UploadAvatar);
