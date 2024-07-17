import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <Link to="profile">
          <img
            src="../../src/assets/icons/simple-profile.svg"
            className="footer__icon footer__icon--profile"
          />
          <p className="footer__label">Profile</p>
        </Link>
        <Link to="/">
          <img
            src="../../src/assets/icons/simple-home.svg"
            className="footer__icon"
          />
          <p className="footer__label">Home</p>
        </Link>
        <Link to="events">
          <img
            src="../../src/assets/icons/simple-events.svg"
            className="footer__icon"
          />
          <p className="footer__label">Events</p>
        </Link>
        <Link to="post">
          <img
            src="../../src/assets/icons/simple-post.svg"
            className="footer__icon"
          />
          <p className="footer__label">Post</p>
        </Link>
      </footer>
    </>
  );
};

export default Footer;
