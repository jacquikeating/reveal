import React from "react";
import "./Hero.scss";

const Hero = ({ img }) => {
  let imgSrc = () => {
    if (img) {
      return img;
    } else {
      return "../src/assets/image-placeholder.png";
      // Placeholder image if no img prop is passed
    }
  };

  return (
    <div className="hero">
      <img className="hero__img" src={imgSrc()}></img>
      <div className="hero__gradient-overlay"></div>
    </div>
  );
};

export default Hero;
