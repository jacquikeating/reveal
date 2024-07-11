import "./EventListingsPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import EventPreview from "../../components/EventPreview/EventPreview";
import { getEventsListEndpoint } from "../../utils/api-utils";

const EventListingsPage = () => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await axios.get(getEventsListEndpoint());
        setEventsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchEventsData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <main className="events-list">
      <section className="events-list__section">
        <h1 className="events-list__heading">Upcoming Events in City</h1>
        <div className="events-list__pagination">
          <img
            src="/src/assets/icons/arrow-left.svg"
            alt="Arrow pointing left"
            className="events-list__arrow"
          />
          <h2 className="events-list__month-subheading">Month</h2>
          <img
            src="/src/assets/icons/arrow-right.svg"
            alt="Arrow pointing right"
            className="events-list__arrow"
          />
        </div>
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
      </section>
    </main>
  );
};

export default EventListingsPage;
