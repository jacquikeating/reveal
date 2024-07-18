import React from "react";
import { Link } from "react-router-dom";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import "./NavExpand.scss";

const NavExpand = () => {
  const loggedIn = true;

  return (
    <div className="nav-expand">
      <Link to="/login" className="nav-expand__link">
        {loggedIn ? "Very Long User Name" : "Log In"}
      </Link>
      <Link to="/login" className="nav-expand__link">
        View Profile
      </Link>
      <Link to="/login" className="nav-expand__link">
        Edit Profile
      </Link>
      <LogOutBtn className="nav-expand__link" />
    </div>
  );
};

export default NavExpand;
