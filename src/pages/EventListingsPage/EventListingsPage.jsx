import React, { useState, useEffect, Suspense, lazy } from "react";
import { db } from "../../config/firebase.js";
import { getDocs, collection } from "firebase/firestore";
const EventsCalendar = lazy(() =>
  import("../../components/EventsCalendar/EventsCalendar")
);
import "./EventListingsPage.scss";

const EventListingsPage = () => {
  const [eventsData, setEventsData] = useState([]);
  const eventsCollectionRef = collection(db, "events");

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

  return (
    <main className="event-listings-page">
      <section className="event-listings-page__header">
        <h1>Events in Toronto</h1>
      </section>
      <Suspense fallback={<p>Loading calendar...</p>}>
        <EventsCalendar eventsData={eventsData} />
      </Suspense>
    </main>
  );
};

export default EventListingsPage;
