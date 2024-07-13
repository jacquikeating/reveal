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
const Gallery = lazy(() => import("../../components/Gallery/Gallery"));
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
    organizer, // remember to rename in sql/knex too
    ticket_prices,
    performers,
    buy_tickets,
    gallery,
  } = eventData;
  const { GA, advanceGA, VIP, advanceVIP, tableDiscounts } =
    eventData.ticket_prices;

  useEffect(() => {
    const fetchEventData = async (req, res) => {
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
          <div className="event__what">
            <h1 className="event__name">{name}</h1>
            <p className="event__description">{description}</p>
          </div>

          <div className="event__where">
            <h3 className="event__info-category-subheading">Location</h3>
            <p className="event__city">{city}</p>
            <p className="event__venue">{venue}</p>
            <p className="event__venue-address">{venue_address}</p>
          </div>

          {/* These tables use ternary operators to render rows only for truthy values. 
              If any value is not specified (e.g. no end time provided, or no early bird discounts),
              we won't bother rendering a table row for it. */}

          {/* prettier-ignore */ }
          <div className="event__when">
            <h3 className="event__info-category-subheading">Time</h3>
            <table className="timetable">
              <tbody>
                {doors_time ? (
                  <tr className="timetable__row">
                    <td className="timetable__label">Doors Open</td>
                    <td className="timetable__time">{doors_time}</td>
                  </tr>) : ("")}
                {start_time ? (
                  <tr className="timetable__row">
                    <td className="timetable__label">Start Time</td>
                    <td className="timetable__time">{start_time}</td>
                  </tr>) : ("")}
                {end_time ? (
                  <tr className="timetable__row">
                    <td className="timetable__label">End Time</td>
                    <td className="timetable__time">{end_time}</td>
                  </tr>) : ("")}
              </tbody>
            </table>
          </div>

          {/* prettier-ignore */ }
          <div className="event__how-much">
            <h3 className="event__info-category-subheading">Ticket Prices</h3>
            <table className="tickets-table">
              <tbody>
                {advanceGA ? (
                  <tr className="tickets-table__row">
                    <td className="tickets-table__label">Advance General Admission</td>
                    <td className="tickets-table__time">${advanceGA}</td>
                  </tr>) : ("")}
                {GA ? (
                  <tr className="tickets-table__row">
                    <td className="tickets-table__label">General Admission</td>
                    <td className="tickets-table__time">${GA}</td>
                  </tr>) : ("")}
                  {advanceVIP ? (
                  <tr className="tickets-table__row">
                    <td className="tickets-table__label">Advance VIP</td>
                    <td className="tickets-table__time">${advanceVIP}</td>
                  </tr>) : ("")}
                  {VIP ? (
                  <tr className="tickets-table__row">
                    <td className="tickets-table__label">VIP</td>
                    <td className="tickets-table__time">${VIP}</td>
                  </tr>) : ("")}
              </tbody>
            </table>
            {tableDiscounts ? (
              <p>Table discounts available</p>
            ) : ("")}
          </div>
          <a href={buy_tickets} target="_blank">
            <button className="buy__tickets">Buy Tickets</button>
          </a>

          <div className="event__who">
            <p>Produced by {organizer}</p>
          </div>
        </section>

        <section className="event__section">
          <h2 className="event__section-heading">Featuring...</h2>
          <PerformersList
            performerIDs={performerIDs}
            allUsersList={usersData}
          />
        </section>

        {/* <section className="event__section">
          <h2 className="event__section-heading">Gallery</h2>
          <Suspense fallback={<p>Loading images...</p>}>
            <Gallery gallery={eventData.gallery} />
          </Suspense>
        </section> */}

        <section className="event__section">
          <h2 className="event__section-heading">Posts</h2>
          <PostsContainer />
        </section>
      </main>
    </>
  );
};

export default EventDetailsPage;
