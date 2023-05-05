import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark sticky-top mb-3" data-bs-theme="dark">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          React JS
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <NavLink className="nav-link"  to="all" >
                All Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="add">
                Add Users
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
