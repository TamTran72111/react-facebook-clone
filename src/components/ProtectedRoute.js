import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

import { getIsLoggedIn } from "../redux/selectors/auth";

const ProtectedRoute = ({ isLoggedIn, component: Component, ...restProps }) => {
  return (
    <Route
      {...restProps}
      render={(props) => {
        if (isLoggedIn) {
          return <Component {...restProps} {...props} />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/auth", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return { isLoggedIn: getIsLoggedIn(state) };
};

export default connect(mapStateToProps)(ProtectedRoute);
