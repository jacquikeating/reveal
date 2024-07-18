import { useEffect, useState, Suspense, lazy } from "react";
import { useParams, Link } from "react-router-dom";
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
// const Gallery = lazy(() => import("../../components/Gallery/Gallery"));
import "./MakeEventPage.scss";

const MakeEventPage = () => {
  // const { eventID } = useParams();
  // const [eventData, setEventData] = useState(emptyEventData);
  // const [performerIDs, setPerformerIDs] = useState([]);
  // const [usersData, setUsersData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const {
  //   name,
  //   subtitle,
  //   city,
  //   month,
  //   day,
  //   main_image,
  //   description,
  //   venue,
  //   venue_address,
  //   doors_time,
  //   start_time,
  //   end_time,
  //   organizer,
  //   ticket_prices,
  //   performers,
  //   buy_tickets,
  //   gallery,
  // } = eventData;
  // const { GA, advanceGA, VIP, advanceVIP, tableDiscounts } =
  //   eventData.ticket_prices;

  // useEffect(() => {}, []);

  // const fetchUsersList = async () => {
  //   try {
  //     const response = await axios.get(getUsersListEndpoint());
  //     setUsersData(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error loading data:", error);
  //     setError(error);
  //     setLoading(false);
  //   }
  // };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <>
      <main className="event">
        <section className="event__section">
          <h1 className="event__name">{name}</h1>
          {
            // Renders a subtitle only if the organizer has opted to include one
            subtitle ? <p className="event__subtitle">{subtitle}</p> : ""
          }
          <div className="event__subsection">
            <p className="event__description">{description}</p>
            {/* <p className="event__organizer">Produced by {organizer}</p> */}
          </div>

          <div className="event__subsection">
            <h3 className="event__info-category-subheading">Venue</h3>
            <div className="event__location">
              <p className="event__venue">{venue}</p>
              <p className="event__address">
                {venue_address}&nbsp; • &nbsp;{city}
              </p>
            </div>
          </div>

          {/* These tables use ternary operators to render rows only for truthy values. 
              If any value is not specified (e.g. no end time provided, or no early bird discounts),
              we won't bother rendering a table row for it. */}

          {/* prettier-ignore */ }
          <div className="event__subsection event__subsection--times-and-tickets">
            <div className="event__times">
              <h3 className="event__info-category-subheading">Time</h3>
              <table className="timetable">
                <tbody>
                  {doors_time ? (
                    <tr className="timetable__row">
                      <td className="timetable__cell tickets-table__cell--label">Doors Open</td>
                      <td className="timetable__cell">{doors_time}</td>
                    </tr>) : ("")}
                  {start_time ? (
                    <tr className="timetable__row">
                      <td className="timetable__cell tickets-table__cell--label">Start Time</td>
                      <td className="timetable__cell">{start_time}</td>
                    </tr>) : ("")}
                  {end_time ? (
                    <tr className="timetable__row">
                      <td className="timetable__cell tickets-table__cell--label">End Time</td>
                      <td className="timetable__cell">{end_time}</td>
                    </tr>) : ("")}
                </tbody>
              </table>
            </div>

          {/* prettier-ignore */ }
          <div className="event__ticket-prices">
            <h3 className="event__info-category-subheading">Ticket Prices</h3>
            <table className="tickets-table">
              <tbody>
                {advanceGA ? (
                  <tr className="tickets-table__row">
                    <td className="tickets-table__cell tickets-table__cell--label">Adv. General Admission</td>
                    <td className="tickets-table__cell">${advanceGA}</td>
                  </tr>) : ("")}
                {GA ? (
                  <tr className="tickets-table__row">
                    <td className="tickets-table__cell tickets-table__cell--label">General Admission</td>
                    <td className="tickets-table__cell">${GA}</td>
                  </tr>) : ("")}
                  {advanceVIP ? (
                  <tr className="tickets-table__row">
                    <td className="tickets-table__cell tickets-table__cell--label">Adv. VIP</td>
                    <td className="tickets-table__cell">${advanceVIP}</td>
                  </tr>) : ("")}
                  {VIP ? (
                  <tr className="tickets-table__row">
                    <td className="tickets-table__cell tickets-table__cell--label">VIP</td>
                    <td className="tickets-table__cell">${VIP}</td>
                  </tr>) : ("")}
              </tbody>
            </table>
            {tableDiscounts ? (
              <p className="tickets-table__table-discounts">Table discounts available</p>
            ) : ("")}
          </div>
          </div>

          <div className="buy-tickets">
            <a href={buy_tickets} target="_blank" className="buy-tickets__link">
              <button className="buy-tickets__button">Buy Tickets</button>
            </a>
          </div>
        </section>

        <section className="event__section">
          <h2 className="event__section-heading">Featuring...</h2>
          <PerformersList
            performerIDs={performerIDs}
            allUsersList={usersData}
          />

          <p className="event__organizer">
            Produced by <Link to="/">{organizer}</Link>
          </p>
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

export default MakeEventPage;
