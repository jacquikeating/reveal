import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Link to="profile">
        <img
          src="../src/assets/icons/simple-profile.svg"
          className="footer__icon footer__icon--profile"
        />
      </Link>
      <Link to="/">
        <img
          src="../src/assets/icons/simple-home.svg"
          className="footer__icon"
        />
      </Link>
      <Link to="events">
        <img
          src="../src/assets/icons/simple-events.svg"
          className="footer__icon"
        />
      </Link>
    </footer>
  );
};

export default Footer;
