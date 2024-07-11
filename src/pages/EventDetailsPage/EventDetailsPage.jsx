import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getSingleEventEndpoint, emptyEventData } from "../../utils/api-utils";
import Hero from "../../components/Hero/Hero";
import DateCircle from "../../components/DateCircle/DateCircle";
import PerformersList from "../../components/PerformersList/PerformersList";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
import "./EventDetailsPage.scss";

const EventDetailsPage = () => {
  const { eventID } = useParams();
  const [eventData, setEventData] = useState(emptyEventData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    name,
    city,
    month,
    day,
    main_image,
    description,
    venue,
    venue_address,
    doors_time,
    start_time,
    end_time,
    producer,
    ticket_prices,
    performers,
    buy_tickets,
  } = eventData;

  useEffect(() => {
    const fetchEventData = async (req) => {
      try {
        const response = await axios.get(getSingleEventEndpoint(eventID));
        setEventData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;
  return (
    <>
      <Hero img={main_image} />
      <main className="event">
        <section className="event__section">
          <h1 className="event__name">{name}</h1>
          <DateCircle month={month.slice(0, 3)} day={day} />
          <p className="event__description">{description}</p>
        </section>

        <section className="event__section">
          <h2 className="event__section-heading">Featuring...</h2>
          <PerformersList performers={performers} />
        </section>

        <section className="event__section">
          <h2 className="event__section-heading">Gallery</h2>
        </section>

        <section className="event__section">
          <h2 className="event__section-heading">Posts</h2>
          <PostsContainer />
        </section>
      </main>
    </>
  );
};

export default EventDetailsPage;
