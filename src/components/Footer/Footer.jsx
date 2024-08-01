import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__section">
          <Link to="account">
            <img
              src="../../src/assets/icons/simple-profile.svg"
              className="footer__icon footer__icon--profile"
            />
            <p className="footer__label">Account</p>
          </Link>
          <Link to="/">
            <img
              src="../../src/assets/icons/simple-home.svg"
              className="footer__icon"
            />
            <p className="footer__label">Home</p>
          </Link>
        </div>

        <div className="footer__section">
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
        </div>
      </footer>
    </>
  );
};

export default Footer;
