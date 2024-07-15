import React from "react";
import { Link } from "react-router-dom";
import "./Logo.scss";

const Logo = () => {
  return (
    <div className="logo__wrapper">
      <Link to="/">
        <p className="logo">Reveal</p>
      </Link>
    </div>
  );
};

export default Logo;
