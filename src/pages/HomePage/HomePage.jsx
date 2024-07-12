import { React, useState, useEffect } from "react";
import axios from "axios";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
import EmblaCarousel from "../../components/EmblaCarousel/EmblaCarousel";
import { getEventsListEndpoint } from "../../utils/api-utils";
import "./HomePage.scss";

const HomePage = () => {
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
    <main className="home">
      <section className="home__section">
        <h2 className="home__section-heading">This Week in City</h2>
        <EmblaCarousel allEventsList={eventsData} />
      </section>
      <section className="home__section">
        <h2 className="home__section-heading">Hot Posts</h2>
        <PostsContainer />
      </section>
    </main>
  );
};

export default HomePage;
