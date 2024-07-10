import React from "react";
import SeeMoreBtn from "../../components/SeeMoreBtn/SeeMoreBtn";
import "./EventPreview.scss";

const EventPreview = ({ name, date, image }) => {
  return (
    <article className="event-preview">
      <h3>{name}</h3>
      <p>{date}</p>
      <div className="event-preview__gradient-overlay"></div>
      <img src={image} className="event-preview__image" />
      {/* <SeeMoreBtn /> */}
    </article>
  );
};

export default EventPreview;
