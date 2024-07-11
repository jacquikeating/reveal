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
    const fetchEventData = async () => {
      try {
        const response = await axios.get(getSingleEventEndpoint(eventID));
        setEventData(response.data);
        setLoading(false);
        console.log(name);
      } catch (error) {
        console.error("Error loading data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;
  return (
    <>
      <Hero />
      <main className="event">
        <section className="event__section">
          <h1 className="event__name">Event Name</h1>
          <DateCircle month="JUN" day="25" />
          <p className="event__description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis,
            explicabo iure saepe aliquid libero dolorum maxime nam eligendi
            cumque. Excepturi quia error qui beatae iusto odit expedita
            molestias at fuga?
          </p>
        </section>

        <section className="event__section">
          <h2 className="event__section-heading">Featuring...</h2>
          <PerformersList />
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
