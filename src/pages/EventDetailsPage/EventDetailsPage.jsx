import { useEffect, useState, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  getSingleEventEndpoint,
  getUsersListEndpoint,
  emptyEventData,
} from "../../utils/api-utils";
import Hero from "../../components/Hero/Hero";
import DateDot from "../../components/DateDot/DateDot";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
import PerformersList from "../../components/PerformersList/PerformersList";
import "./EventDetailsPage.scss";

const EventDetailsPage = () => {
  const { eventID } = useParams();
  const [eventData, setEventData] = useState(emptyEventData);
  const [performerIDs, setPerformerIDs] = useState([]);
  const [usersData, setUsersData] = useState([]);
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
        setPerformerIDs(response.data.performers);
        fetchUsersList();
      } catch (error) {
        console.error("Error loading data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  const fetchUsersList = async () => {
    try {
      const response = await axios.get(getUsersListEndpoint());
      setUsersData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setError(error);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <>
      <Hero img={main_image} />
      <main className="event">
        <section className="event__section">
          <DateDot
            month={month.slice(0, 3)}
            day={day}
            topOffset="-3rem"
            leftOffset="0.9rem"
          />
          <h1 className="event__name">{name}</h1>
          <p className="event__description">{description}</p>
        </section>

        <section className="event__section">
          <h2 className="event__section-heading">Featuring...</h2>
          <PerformersList
            performerIDs={performerIDs}
            allUsersList={usersData}
          />
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
