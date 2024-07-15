import "./EventListingsPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import EventPreview from "../../components/EventPreview/EventPreview";
import { getEventsListEndpoint } from "../../utils/api-utils";

const EventListingsPage = () => {
  let today = new Date();
  const currentMonth = today.toLocaleString("en-US", { month: "long" });
  const userCity = "Toronto"; // replace with user data

  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [month, setMonth] = useState(currentMonth);

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

  function monthAhead() {
    today.setMonth(today.getMonth() + 1);
    const nextMonth = today.toLocaleString("en-US", { month: "long" });
    setMonth(nextMonth);
    console.log(filterEventsByMonth());
  }

  function monthBehind() {
    // today.setMonth(today.getMonth() - 1);
    // const prevMonth = today.toLocaleString("en-US", { month: "long" });
    // setMonth(prevMonth);
    // console.log(filterEventsByMonth());
    setMonth(currentMonth);
  }

  function filterEventsByMonth() {
    console.log(eventsData);
    return eventsData.filter((event) => {
      return event.month == month;
    });
  }

  let filteredMonths = filterEventsByMonth();
  console.log(filteredMonths);

  return (
    <main className="events-list">
      <section className="events-list__section">
        <h1 className="events-list__heading">Upcoming Events in {userCity}</h1>
        <div className="events-list__pagination">
          <img
            src="/src/assets/icons/arrow-left.svg"
            alt="Arrow pointing left"
            className="events-list__arrow"
            onClick={monthBehind}
          />
          <h2 className="events-list__month-subheading">{month}</h2>
          <img
            src="/src/assets/icons/arrow-right.svg"
            alt="Arrow pointing right"
            className="events-list__arrow"
            onClick={monthAhead}
          />
        </div>

        {filteredMonths.map((show) => {
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
