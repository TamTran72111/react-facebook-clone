import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { signIn } from "../../redux/actions/auth";
import { finishedLoading } from "../../redux/actions/loading";
import RequiredInput from "../ui/RequiredInput";
import ErrorMessage from "../ui/ErrorMessage";
import { getIsLoggedIn } from "../../redux/selectors/auth";
import Signup from "./Signup";

import "./Login.css";

const Login = ({ signIn, isLoggedIn, finishedLoading }) => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    if (password.length >= 6) {
      try {
        await signIn({ email, password });
      } catch (err) {
        finishedLoading();
        setError(err.message);
      }
    } else {
      setError("Password should be at least 6 characters");
    }
  };

  const redirectLocation = location.state?.from || "/";
  if (isLoggedIn) {
    return <Redirect to={redirectLocation} />;
  }

  return (
    <div>
      <form className="loginForm" onSubmit={login}>
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

        <div className="field">
          <div className="control">
            <button
              className="button is-link is-fullwidth is-size-5 has-text-weight-bold"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>

        <div className="has-text-centered">
          {/* eslint-disable-next-line */}
          <a>Forgotten password?</a>
        </div>

        <hr />

        <div className="field has-text-centered">
          <div className="control">
            <span
              className="button is-success is-size-5 has-text-weight-bold"
              onClick={() => setShowSignup(true)}
            >
              Create new account
            </span>
          </div>
        </div>
      </form>
      <ErrorMessage errorMessage={error} onClick={() => setError("")} />
      <Signup show={showSignup} hide={() => setShowSignup(false)} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isLoggedIn: getIsLoggedIn(state) };
};

export default connect(mapStateToProps, { signIn, finishedLoading })(Login);
