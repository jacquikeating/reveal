import React from "react";
import EventPreview from "../EventPreview/EventPreview";
import "./EventsList.scss";

const EventsList = ({ eventsData }) => {
  return (
    <div className="events-list">
      {eventsData.map((show) => {
        return (
          <EventPreview
            key={show.id}
            id={show.id}
            name={show.name}
            date={`${show.month} ${show.day}`}
            image={show.main_image}
          />
        );
      })}
    </div>
  );
};

export default EventsList;
