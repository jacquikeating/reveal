import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Hero from "../../components/Hero/Hero";
import EmblaCarousel from "../../components/EmblaCarousel/EmblaCarousel";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
import { getEventsListEndpoint } from "../../utils/api-utils";
import "./HomePage.scss";

const HomePage = () => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextEvent, setNextEvent] = useState(null);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await axios.get(getEventsListEndpoint());
        setEventsData(response.data.slice(1));
        setLoading(false);
        setNextEvent(response.data[0]);
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
    <>
      <Link to={`/events/${nextEvent.id}`}>
        <Hero img={nextEvent.main_image} nextEvent={nextEvent} />
      </Link>

      <main className="home">
        <section className="home__section">
          <h2 className="home__section-heading">More Upcoming Events</h2>
          <EmblaCarousel allEventsList={eventsData} />
        </section>
        <section className="home__section">
          <h2 className="home__section-heading">Hot Posts</h2>
          <PostsContainer />
        </section>
      </main>
    </>
  );
};

export default HomePage;
