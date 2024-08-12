import React, { useState, useEffect, Suspense, lazy } from "react";
import { db } from "../../config/firebase.js";
import { getDocs, collection } from "firebase/firestore";
const EventsCalendar = lazy(() =>
  import("../../components/EventsCalendar/EventsCalendar")
);
const EventsList = lazy(() => import("../../components/EventsList/EventsList"));
import "./EventListingsPage.scss";
import { format, addMonths, subMonths } from "date-fns";

const EventListingsPage = () => {
  let tempUserData = {
    homeCity: "Dfsdf",
  };
  const [eventsData, setEventsData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(tempUserData.homeCity);
  const eventsCollectionRef = collection(db, "events");
  const [displayCalendar, setDisplayCalendar] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentMonthName, setCurrentMonthName] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );

  const filteredEvents = eventsData
    .filter((event) => {
      return event.month == currentMonthName && event.city == selectedCity;
    })
    .sort((a, b) => a.day - b.day);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const data = await getDocs(eventsCollectionRef);
        const filteredData = [
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })),
        ];
        setEventsData(filteredData[0]);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchEventsData();
  }, []);

  function switchDisplay() {
    if (displayCalendar) {
      setDisplayCalendar(false);
    } else {
      setDisplayCalendar(true);
    }
  }

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
    <main className="event-listings-page">
      <section className="event-listings-page__header">
        <h1>Events in Toronto</h1>
        <div className="calendar">{renderHeader()}</div>
        <button
          className="event-listings-page__switch-display-button"
          onClick={switchDisplay}
        >
          {displayCalendar ? "Switch to list view" : "Switch to calendar view"}
        </button>
      </section>
      <section className="event-listings-page__content">
        <Suspense fallback={<p>Loading events...</p>}>
          {displayCalendar ? (
            <EventsCalendar
              eventsData={eventsData}
              currentMonth={currentMonth}
              currentMonthName={currentMonthName}
              filteredEvents={filteredEvents}
            />
          ) : (
            <section>
              <EventsList
                eventsData={eventsData}
                currentMonth={currentMonth}
                currentMonthName={currentMonthName}
                filteredEvents={filteredEvents}
              />
            </section>
          )}
        </Suspense>
      </section>
    </main>
  );
};

export default EventListingsPage;
