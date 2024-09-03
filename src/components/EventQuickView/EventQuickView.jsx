import React from "react";
import { Link } from "react-router-dom";
import "./EventQuickView.scss";

export const EventQuickView = ({ event }) => {
  const { name, month, day, main_image, description, venue, id } = event;

  return (
    <div className="event-quickview">
      <h2 className="event-quickview__title">{name}</h2>
      <img src={main_image} className="event-quickview__img" />
      <h3 className="event-quickview__subtitle">
        {month} {day} at {venue}
      </h3>
      <div className="event-quickview__desc-container">
        <div className="event-quickview__desc-gradient"></div>
        <p className="event-quickview__desc">{description}</p>
      </div>
      <p className="event-quickview__ellipses">...</p>
      <Link to={`/events/${id}`}>
        <button className="event-quickview__btn">Full Details</button>
      </Link>
    </div>
  );
};
