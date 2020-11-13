import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from "./history";
import Navbar from "./components/nav/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <div className="app">
      <Router history={history}>
        <div className="nav-wrapper">
          <Navbar />
        </div>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth" exact component={Auth} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
