import React from "react";
import { Link } from "react-router-dom";
// import SeeMoreBtn from "../../components/SeeMoreBtn/SeeMoreBtn";
import "./EventPreview.scss";

const EventPreview = ({ id, name, date, image }) => {
  return (
    <Link
      to={`/events/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <article className="event-preview">
        <h3 className="event-preview__name">{name}</h3>
        <p className="event-preview_date">{date}</p>
        <div className="event-preview__gradient-overlay"></div>
        <img src={image} className="event-preview__image" />
        {/* <SeeMoreBtn /> */}
      </article>
    </Link>
  );
};

export default EventPreview;
