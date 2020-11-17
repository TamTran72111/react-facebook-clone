import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import { getAuthUser } from "../../redux/selectors/auth";
import UserAvatar from "../ui/UserAvatar";

import "./PostModal.css";

const PostModal = ({
  user,
  show,
  title,
  value,
  onChange,
  close,
  buttonClick,
  buttonText,
  placeholder,
}) => {
  const textArea = useRef();
  useEffect(() => {
    if (show && textArea.current) {
      textArea.current.focus();
      textArea.current.setSelectionRange(value.length, value.length);
    }
    // eslint-disable-next-line
  }, [show]);

  if (!show) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={close}></div>
      <div className="modal-content post-modal">
        <div className="box">
          <div className="control has-icons-right">
            <h4 className="title is-4 has-text-centered">{title}</h4>
            <span className="icon is-small is-right" onClick={close}>
              <i className="fas fa-times-circle"></i>
            </span>
          </div>

          <hr className="mb-1" />

          <div className="card-content py-2">
            <div className="media">
              <div className="media-left">
                <UserAvatar src={user.avatar} userId={user.id} />
              </div>
              <div className="media-content is-align-self-center">
                <p className="title is-5">{user.displayName}</p>
              </div>
            </div>

            <div className="content mt-3">
              <div className="field">
                <div className="control">
                  <textarea
                    ref={textArea}
                    rows="5"
                    className="textarea"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                  ></textarea>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button
                    disabled={!value}
                    className="button is-info is-fullwidth has-text-weight-semibold"
                    onClick={buttonClick}
                  >
                    {buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: getAuthUser(state) });

export default connect(mapStateToProps)(PostModal);
