import React from "react";
import "./DateCircle.scss";

const DateCircle = ({ month, day }) => {
  return (
    <div className="date-circle">
      <p className="date-circle__month">{month}</p>
      <p className="date-circle__day">{day}</p>
    </div>
  );
};

export default DateCircle;
