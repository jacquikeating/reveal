import React from "react";
import "./Socials.scss";

const Socials = () => {
  return (
    <ul className="socials">
      <li className="socials__item">
        <a href="/" className="socials__link">
          <img
            className="socials__icon socials__icon-fb"
            src="../../src/assets/icons/social-fb.svg"
          />
        </a>
      </li>
      <li className="socials__item">
        <a href="/" className="socials__link">
          <img
            className="socials__icon socials__icon-insta"
            src="../../src/assets/icons/social-insta.svg"
          />
        </a>
      </li>
      <li className="socials__item">
        <a href="/" className="socials__link">
          <img
            className="socials__icon socials__icon-twitter"
            src="../../src/assets/icons/social-twitter.svg"
          />
        </a>
      </li>
      <li className="socials__item">
        <a href="/" className="socials__link">
          <img
            className="socials__icon socials__icon-tiktok"
            src="../../src/assets/icons/social-tiktok.svg"
          />
        </a>
      </li>
    </ul>
  );
};

export default Socials;
