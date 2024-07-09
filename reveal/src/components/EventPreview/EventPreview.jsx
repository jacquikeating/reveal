import React from "react";
import SeeMoreBtn from "../../components/SeeMoreBtn/SeeMoreBtn";
import "./EventPreview.scss";

const EventPreview = () => {
  return (
    <article className="event-preview">
      <h3>Event Name</h3>
      <p>July 19 at 8 PM</p>
      <SeeMoreBtn />
    </article>
  );
};

export default EventPreview;
