import React from "react";
import "./DateDot.scss";

const DateDot = ({ month, day, topOffset, leftOffset, scale }) => {
  return (
    <div
      className="date-dot"
      style={{ top: topOffset, left: leftOffset, transform: `scale(${scale})` }}
    >
      <p className="date-dot__month">{month}</p>
      <p className="date-dot__day">{day}</p>
    </div>
  );
};

export default DateDot;
