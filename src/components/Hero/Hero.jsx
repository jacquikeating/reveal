import React from "react";
import "./Hero.scss";

const Hero = ({ img, nextEvent }) => {
  let imgSrc = () => {
    if (img) {
      return img;
    } else {
      return "../src/assets/image-placeholder.png"; // Placeholder image
    }
  };

  return (
    <div className="hero" style={{ "--img": `url(${imgSrc()})` }}>
      <img className="hero__img" src={imgSrc()} />
      <div className="hero__gradient-overlay"></div>
      {nextEvent ? (
        <div className="next-event">
          <h2 className="next-event__title">Next Show in Toronto:</h2>
          <p className="next-event__name">{nextEvent.name}</p>
          <p className="next-event__details">
            {nextEvent.month} {nextEvent.day}
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Hero;
