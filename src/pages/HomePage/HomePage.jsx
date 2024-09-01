import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import EmblaCarousel from "../../components/EmblaCarousel/EmblaCarousel";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
import EventPreview from "../../components/EventPreview/EventPreview";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import "./HomePage.scss";

const HomePage = () => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextEvent, setNextEvent] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const data = await getDocs(collection(db, "events"));
        const firestoreEventsData = [
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })),
        ];
        firestoreEventsData.sort((a, b) => a.day - b.day);
        setEventsData(firestoreEventsData[0]);
        setNextEvent(firestoreEventsData[0][0]);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setError(true);
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
          <EmblaCarousel eventsData={eventsData} />
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
