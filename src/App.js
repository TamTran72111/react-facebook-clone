import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from "./history";
import Navbar from "./components/nav/Navbar";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="app">
      <Router history={history}>
        <div className="nav-wrapper">
          <Navbar />
        </div>
        <div className="container">
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
