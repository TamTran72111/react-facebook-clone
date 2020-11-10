import React from "react";
import { Link } from "react-router-dom";

import logo from "./logo.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img className="logo" src={logo} alt="Facebook logo" />
        </Link>
        <input
          className="input is-rounded mt-2"
          type="text"
          placeholder="Search"
        />
        <a className="navbar-burger burger">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <Link title="Home" to="/" className="navbar-item mx-3">
            <span className="icon is-medium">
              <i className="fas fa-home fa-2x"></i>
            </span>
          </Link>

          <Link title="Friends" to="/" className="navbar-item mx-3">
            <span className="icon is-medium">
              <i className="fas fa-user-friends fa-2x"></i>
            </span>
          </Link>

          <Link title="Watch" to="/" className="navbar-item mx-3">
            <span className="icon is-medium">
              <i className="fab fa-youtube fa-2x"></i>
            </span>
          </Link>

          <Link title="Marketplace" to="/" className="navbar-item mx-3">
            <span className="icon is-medium">
              <i className="fas fa-store fa-2x"></i>
            </span>
          </Link>

          <Link title="Groups" to="/" className="navbar-item mx-3">
            <span className="icon is-medium">
              <i className="fas fa-users fa-2x"></i>
            </span>
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-primary">
                <strong>Logout</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
