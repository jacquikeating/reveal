import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Link to="profile">
        <img
          src="../src/assets/icons/nav-profile.svg"
          className="footer__icon"
        />
      </Link>
      <Link to="/">
        <img src="../src/assets/icons/nav-home.svg" className="footer__icon" />
      </Link>
      <Link to="events">
        <img
          src="../src/assets/icons/nav-events.svg"
          className="footer__icon"
        />
      </Link>
    </footer>
  );
};

export default Footer;
