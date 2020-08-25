import React from "react";
import "./Dropdown.css";
import bookmark from "../../Images/bookmark.png";
import journey from "../../Images/journey.png";
import profile from "../../Images/user.png";
import logout from "../../Images/logout.png";
import { useHistory } from "react-router-dom";

const Dropdown = ({ showProfileDropdown }) => {
  let history = useHistory();

  const openProfile = () => {
    history.push(`/profile`);
    showProfileDropdown();
  };

  const openJourney = () => {
    history.push(`/add-journey`);
    showProfileDropdown();
  };

  const openBookmark = () => {
    history.push(`/bookmark`);
    showProfileDropdown();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    showProfileDropdown();
  };

  return (
    <div>
      <div className="kotak">
        <div className="list-dropdown" onClick={() => openProfile()}>
          <img src={profile} alt="profile" />
          <span>Profile</span>
        </div>
        <div className="list-dropdown" onClick={() => openJourney()}>
          <img src={journey} alt="journey" />
          <span>Journey</span>
        </div>
        <div className="list-dropdown" onClick={() => openBookmark()}>
          <img src={bookmark} alt="bookmark" />
          <span>Bookmark</span>
        </div>
        <hr />
        <div className="list-dropdown" onClick={() => handleLogout()}>
          <img src={logout} alt="logout" />
          <span>Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
