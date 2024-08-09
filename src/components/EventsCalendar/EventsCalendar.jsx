import React, { useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  parse,
} from "date-fns";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { EventQuickView } from "../../components/EventQuickView/EventQuickView";
import "./EventsCalendar.scss";

const EventsCalendar = ({ currentMonth, filteredEvents }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventToShowInModal, setEventToShowInModal] = useState(null);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const daysWithEvents = filteredEvents.map((show) => Number(show.day));
  const dayWithEvent = (day) => {
    return daysWithEvents.includes(day);
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  function openModal(event) {
    const showData = filteredEvents.find(
      (show) => show.main_image == event.target.src
    );
    setEventToShowInModal(showData);
    onOpenModal();
  }

  const renderDays = () => {
    const days = [];
    const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {daysOfTheWeek[i]}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => onDateClick(parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            {dayWithEvent(day.getDate()) ? (
              <img
                src={
                  filteredEvents.find((show) => show.day == day.getDate())
                    .main_image
                }
                className="bg"
                onClick={() => openModal(event)}
              />
            ) : (
              ""
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  return (
    <div className="calendar">
      {renderDays()}
      {renderCells()}
      <Modal open={open} onClose={onCloseModal} center>
        <EventQuickView event={eventToShowInModal} />
      </Modal>
    </div>
  );
};

export default EventsCalendar;
