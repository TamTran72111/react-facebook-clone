import React, { useState } from "react";
import { connect } from "react-redux";

import { signUp } from "../../redux/actions/auth";
import { finishedLoading } from "../../redux/actions/loading";
import BaseModal from "../ui/BaseModal";
import ErrorMessage from "../ui/ErrorMessage";
import RequiredInput from "../ui/RequiredInput";

import "./Signup.css";

const Signup = ({ show, hide, signUp, finishedLoading }) => {
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp({ email, password, firstname, surname });
    } catch (err) {
      finishedLoading();
      setError(err.message);
    }
  };

  if (!show) return null;

  return (
    <BaseModal className="modal is-active">
      <ErrorMessage errorMessage={error} onClick={() => setError("")} />
      <div className="modal-background" onClick={hide}></div>
      <div className="modal-content">
        <div className="box">
          <h3 className="title is-2 mb-2">Sign Up</h3>
          <span className="has-text-grey">It's quick and easy.</span>
          <hr className="is-fullwidth" />

          <form onSubmit={onSubmit}>
            <div className="field is-justify-content-space-between">
              <RequiredInput
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <RequiredInput
                type="text"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>

            <RequiredInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon="fa-envelope"
            />

            <RequiredInput
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon="fa-lock"
            />

            <span className="has-text-light-grey is-size-7">
              By clicking Sign Up, you agree to our&nbsp;
              <a
                href="https://www.facebook.com/legal/terms/update"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms
              </a>
              ,
              <a
                href="https://www.facebook.com/about/privacy/update"
                target="_blank"
                rel="noopener noreferrer"
              >
                Data Policy
              </a>
              and
              <a
                href="http://https://www.facebook.com/policies/cookies/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cookie Policy
              </a>
              . You may receive SMS notifications from us and can opt out at any
              time.
            </span>

            <div className="field my-3 has-text-centered">
              <div className="control">
                <button
                  type="submit"
                  className="button is-success is-size-5 has-text-weight-bold"
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </BaseModal>
  );
};

export default connect(null, { signUp, finishedLoading })(Signup);
