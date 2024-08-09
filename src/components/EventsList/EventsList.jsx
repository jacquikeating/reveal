import React from "react";
import EventPreview from "../EventPreview/EventPreview";
import "./EventsList.scss";

const EventsList = ({ filteredEvents }) => {
  return (
    <div className="events-list">
      {filteredEvents.length > 0 ? (
        filteredEvents.map((show) => {
          return (
            <EventPreview
              key={show.id}
              id={show.id}
              name={show.name}
              date={`${show.month} ${show.day}`}
              image={show.main_image}
            />
          );
        })
      ) : (
        <p className="events-list__none-found-msg">
          No events found for this month
        </p>
      )}
    </div>
  );
};

export default EventsList;
