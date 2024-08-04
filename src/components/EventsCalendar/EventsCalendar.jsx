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
  addMonths,
  subMonths,
} from "date-fns";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { EventQuickView } from "../../components/EventQuickView/EventQuickView";
import "./EventsCalendar.scss";

const EventsCalendar = ({ eventsData }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentMonthName, setCurrentMonthName] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventToShowInModal, setEventToShowInModal] = useState(null);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const filteredEvents = eventsData.filter((event) => {
    return event.month == currentMonthName;
  });

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  };
  const daysWithEvents = filteredEvents.map((show) => Number(show.day));
  const dayWithEvent = (day) => {
    return daysWithEvents.includes(day);
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
  const onDateClick = (day) => {
    setSelectedDate(day);
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    setCurrentMonthName(
      addMonths(currentMonth, 1).toLocaleString("default", { month: "long" })
    );
  };
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    setCurrentMonthName(
      subMonths(currentMonth, 1).toLocaleString("default", { month: "long" })
    );
  };
  return (
    <section className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <Modal open={open} onClose={onCloseModal} center>
        <EventQuickView event={eventToShowInModal} />
      </Modal>
    </section>
  );
};

export default EventsCalendar;
