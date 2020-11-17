import React, { useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import history from "./history";
import Navbar from "./components/nav/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { setupAuthListener, cleanupAuth } from "./redux/actions/auth";
import ProtectedRoute from "./components/ProtectedRoute";

const App = ({ setupAuthListener, cleanupAuth }) => {
  useEffect(() => {
    setupAuthListener();
    return () => cleanupAuth();
  }, [setupAuthListener, cleanupAuth]);

  return (
    <div className="app">
      <Router history={history}>
        <Navbar />
        <div className="container">
          <Switch>
            <ProtectedRoute path="/" exact component={Home} />
            <Route path="/auth" exact component={Auth} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default connect(null, { setupAuthListener, cleanupAuth })(App);
