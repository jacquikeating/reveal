import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Hero from "../../components/Hero/Hero";
import EmblaCarousel from "../../components/EmblaCarousel/EmblaCarousel";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
import EventPreview from "../../components/EventPreview/EventPreview";
import { getEventsListEndpoint } from "../../utils/api-utils";
import "./HomePage.scss";

const HomePage = () => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextEvent, setNextEvent] = useState(null);
  const userID = localStorage.getItem("user");

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
      <div className="homepage-hero">
        <Link to={`/events/${nextEvent.id}`}>
          <Hero img={nextEvent.main_image} nextEvent={nextEvent} />
        </Link>
      </div>

      <main className="home">
        <section className="home__section">
          <h2 className="home__section-heading home__section-heading--top">
            More <span>Upcoming</span> Events
          </h2>

          <div className="home__desktop-events">
            {eventsData.slice(0, 5).map((show) => {
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
            <Link to={`/events/`}>
              <div className="home__desktop-events-link">
                <h2 className="home__desktop-see-more">See All Events</h2>
                <img
                  src="/src/assets/icons/arrow-right.svg"
                  alt="right arrow"
                  className="home__desktop-icon"
                />
              </div>
            </Link>
          </div>

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
