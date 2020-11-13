import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { signIn } from "../../redux/actions/auth";
import RequiredInput from "../ui/RequiredInput";
import ErrorMessage from "../ui/ErrorMessage";
import { getIsLoggedIn } from "../../redux/selectors/auth";

import "./Login.css";

const Login = ({ signIn, isLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    if (password.length >= 6) {
      try {
        await signIn({ email, password });
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Password should be at least 6 characters");
    }
  };

  if (isLoggedIn) return <Redirect to="/" />;

  return (
    <div>
      <form onSubmit={login}>
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
            <span className="button is-success is-size-5 has-text-weight-bold">
              Create new account
            </span>
          </div>
        </div>
      </form>
      <ErrorMessage errorMessage={error} onClick={() => setError("")} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isLoggedIn: getIsLoggedIn(state) };
};

export default connect(mapStateToProps, { signIn })(Login);
