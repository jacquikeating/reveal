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
    <main className="make-event">
      <form className="make-event__form">
        <h3 className="make-event__subheading">Core Info</h3>
        <label>
          Event Name
          <input
            type="text"
            className="make-event__name"
            onChange={(e) => setEventName(e.target.value)}
          />
        </label>
        <label>
          Subtitle
          <input
            type="text"
            className="make-event__subtitle"
            onChange={(e) => setEventSubtitle(e.target.value)}
          />
        </label>

        <label>
          Description
          <textarea
            className="make-event__description"
            onChange={(e) => setEventDescription(e.target.value)}
          ></textarea>
        </label>

        <h3 className="make-event__subheading">Location</h3>
        <label>
          City
          <select
            className="make-event__select-city"
            // defaultValue={selectedCity}
            onChange={(e) => setEventCity(e.target.value)}
          >
            <option value="Montreal" className="make-event__city-option">
              Montreal
            </option>
            <option value="Toronto" className="make-event__city-option">
              Toronto
            </option>
            <option value="Vancouver" className="make-event__city-option">
              Vancouver
            </option>
          </select>
        </label>

        <div className="event__location">
          <label>
            Venue Name
            <input
              type="text"
              className="make-event__text-input"
              onChange={(e) => setEventVenue(e.target.value)}
            />
          </label>
          <label>
            Venue Address
            <input
              type="text"
              className="make-event__text-input"
              onChange={(e) => setEventAddress(e.target.value)}
            />
          </label>
        </div>

        <h3 className="make-event__subheading">Date & Time</h3>
        <label>
          Date & Official Start Time
          <input
            type="datetime-local"
            className="make-event__datetime-input"
            onChange={(e) => setEventTimestamp(e.target.value)}
          />
        </label>

        <label>
          Doors Time
          <input
            type="time"
            className="make-event__time-input"
            onChange={(e) => setEventDoorsTime(e.target.value)}
          />
        </label>

        <label>
          End Time
          <input
            type="time"
            className="make-event__time-input"
            onChange={(e) => setEventEndTime(e.target.value)}
          />
        </label>

        <h3 className="make-event__subheading">Performers</h3>

        <h3 className="make-event__subheading">Tickets</h3>
        <label>
          Link to Buy Tickets
          <input
            type="text"
            className="make-event__text-input"
            onChange={(e) => setEventBuyTicketsLink(e.target.value)}
          />
        </label>

        <label>
          Advance GA
          <input
            type="number"
            className="make-event__num-input"
            // onChange={(e) => ????(e.target.value)}
          />
        </label>
        <label>
          Advance VIP
          <input
            type="number"
            className="make-event__num-input"
            // onChange={(e) => ????(e.target.value)}
          />
        </label>
        <label>
          GA
          <input
            type="number"
            className="make-event__num-input"
            // onChange={(e) => ????(e.target.value)}
          />
        </label>
        <label>
          VIP
          <input
            type="number"
            className="make-event__num-input"
            // onChange={(e) => ????(e.target.value)}
          />
        </label>

        <button>Submit</button>
      </form>
    </main>
  );
};

export default MakeEventPage;
