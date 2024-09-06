import { useEffect, useState, Suspense, lazy } from "react";
import { useParams, Link } from "react-router-dom";
import { emptyEventData } from "../../utils/api-utils";
import { db } from "../../config/firebase.js";
import { doc, setDoc } from "firebase/firestore";
import Hero from "../../components/Hero/Hero";
import DateDot from "../../components/DateDot/DateDot";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
import PerformersList from "../../components/PerformersList/PerformersList";
// const Gallery = lazy(() => import("../../components/Gallery/Gallery"));
import "./MakeEventPage.scss";

const MakeEventPage = () => {
  // const [eventData, setEventData] = useState(emptyEventData);
  const [eventName, setEventName] = useState("");
  const [eventSubtitle, setEventSubtitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventProducer, setEventProducer] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventTimestamp, setEventTimestamp] = useState("");
  const [eventDoorsTime, setEventDoorsTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventTicketPrices, setEventTicketPrices] = useState({});
  const [eventBuyTicketsLink, setEventBuyTicketsLink] = useState("");
  const [eventPerformers, setEventPerformers] = useState([]);

  async function createEvent() {
    // await setDoc(doc(db, "events", `${user.uid}`), {
    //   name: name,
    //   uid: user.uid,
    //   email: email,
    //   profileURL: nameToURL(name),
    //   homeCity: homeCity,
    // });
  }

  return (
    <>
      <main className="event">
        <section className="event__section">
          <h1 className="event__name">{eventName}</h1>
          <p className="event__subtitle">{eventSubtitle}</p>
          <div className="event__subsection">
            <p className="event__description">{eventDescription}</p>
            <p className="event__organizer">Produced by {eventProducer}</p>
          </div>

          <div className="event__subsection">
            <h3 className="event__info-category-subheading">Venue</h3>
            <div className="event__location">
              <p className="event__venue">{eventVenue}</p>
              <p className="event__address">
                {eventAddress}&nbsp; • &nbsp;{eventCity}
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
                {/* <tbody>
                  {doors_time ? (
                    <tr className="timetable__row">
                      <td className="timetable__cell tickets-table__cell--label">Doors Open</td>
                      <td className="timetable__cell">{eventDoorsTime}</td>
                    </tr>) : ("")}
                  {start_time ? (
                    <tr className="timetable__row">
                      <td className="timetable__cell tickets-table__cell--label">Start Time</td>
                      <td className="timetable__cell">{eventTimestamp}</td>
                    </tr>) : ("")}
                  {end_time ? (
                    <tr className="timetable__row">
                      <td className="timetable__cell tickets-table__cell--label">End Time</td>
                      <td className="timetable__cell">{eventEndTime}</td>
                    </tr>) : ("")}
                </tbody> */}
              </table>
            </div>

          {/* prettier-ignore */ }
          <div className="event__ticket-prices">
            <h3 className="event__info-category-subheading">Ticket Prices</h3>
            <table className="tickets-table">
              {/* <tbody>
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
              </tbody> */}
            </table>
            {/* {tableDiscounts ? (
              <p className="tickets-table__table-discounts">Table discounts available</p>
            ) : ("")} */}
          </div>
          </div>

          <div className="buy-tickets">
            <a
              href={eventBuyTicketsLink}
              target="_blank"
              className="buy-tickets__link"
            >
              <button className="buy-tickets__button">Buy Tickets</button>
            </a>
          </div>
        </section>

        <section className="event__section">
          {/* <h2 className="event__section-heading">Featuring...</h2>
          <PerformersList
            performerIDs={performerIDs}
            allUsersList={usersData}
          /> */}

          <p className="event__organizer">
            Produced by <Link to="/">{eventProducer}</Link>
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
          {/* <PostsContainer /> */}
        </section>
      </main>
    </>
  );
};

export default MakeEventPage;
