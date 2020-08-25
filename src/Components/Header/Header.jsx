import React, { useState } from "react";
import "./Header.css";
import Dropdown from "../Dropdown/Dropdown";
import profile from "../../Images/profile.png";
import { Link } from "react-router-dom";

const Header = ({ showModalLogin, showModalRegister }) => {
  const [isProfileDropdown, setProfileDropdown] = useState(false);

  const showProfileDropdown = () => {
    setProfileDropdown(!isProfileDropdown);
  };

  return (
    <div className="App-header">
      {!localStorage.token && (
        <div className="Header">
          <Link to="/">
            <div className="header-left"></div>
          </Link>
          <div className="header-right">
            {!localStorage.token && (
              <div>
                <button className="btn-login" onClick={() => showModalLogin()}>
                  Login
                </button>
                <button
                  className="btn-register"
                  onClick={() => showModalRegister()}
                >
                  Register
                </button>
              </div>
            )}
            {localStorage.token && (
              <div className="profile-header">
                <img
                  src={profile}
                  alt=""
                  onClick={() => showProfileDropdown()}
                />
              </div>
            )}
            {isProfileDropdown && (
              <Dropdown showProfileDropdown={showProfileDropdown} />
            )}
          </div>
        </div>
      )}
      {localStorage.token && (
        <div className="header-login">
          <Link to="/">
            <div className="header-left"></div>
          </Link>
          <div className="header-right">
            {!localStorage.token && (
              <div>
                <button className="btn-login" onClick={() => showModalLogin()}>
                  Login
                </button>
                <button
                  className="btn-register"
                  onClick={() => showModalRegister()}
                >
                  Register
                </button>
              </div>
            )}
            {localStorage.token && (
              <div className="profile-header">
                <img
                  src={profile}
                  alt=""
                  onClick={() => showProfileDropdown()}
                />
              </div>
            )}
            {isProfileDropdown && (
              <Dropdown showProfileDropdown={showProfileDropdown} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
