import React, { useState, useEffect, Suspense, lazy } from "react";
import { db } from "../../config/firebase.js";
import { getDocs, collection } from "firebase/firestore";
const EventsCalendar = lazy(() =>
  import("../../components/EventsCalendar/EventsCalendar")
);
const EventsList = lazy(() => import("../../components/EventsList/EventsList"));
import "./EventListingsPage.scss";

const EventListingsPage = () => {
  const [eventsData, setEventsData] = useState([]);
  const eventsCollectionRef = collection(db, "events");
  const [displayCalendar, setDisplayCalendar] = useState(true);

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

  return (
    <main className="event-listings-page">
      <section className="event-listings-page__header">
        <h1>Events in Toronto</h1>
        <button
          className="event-listings-page__switch-display-button"
          onClick={switchDisplay}
        >
          {displayCalendar ? "Switch to list view" : "Switch to calendar view"}
        </button>
      </section>
      <Suspense fallback={<p>Loading events...</p>}>
        {displayCalendar ? (
          <EventsCalendar eventsData={eventsData} />
        ) : (
          <section>
            <EventsList eventsData={eventsData} />
          </section>
        )}
      </Suspense>
    </main>
  );
};

export default EventListingsPage;
