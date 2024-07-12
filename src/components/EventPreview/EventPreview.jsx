import React from "react";
import { Link } from "react-router-dom";
import DateDot from "../DateDot/DateDot";
import "./EventPreview.scss";

const EventPreview = ({ id, name, date, image }) => {
  return (
    <Link
      to={`/events/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <article className="event-preview">
        <h3 className="event-preview__name">{name}</h3>
        <div className="event-preview__gradient-overlay"></div>
        <img src={image} className="event-preview__image" />
        <DateDot
          month={date.slice(0, 3)}
          day={date.slice(-2)}
          topOffset="7.3rem"
          leftOffset="-1rem"
          scale="0.9"
        />
      </article>
    </Link>
  );
};

export default EventPreview;
