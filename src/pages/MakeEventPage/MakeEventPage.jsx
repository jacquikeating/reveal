import { useState } from "react";
import { collection, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import FileUploader from "../../components/FirestoreUpload/FirestoreUpload";
import { Modal } from "react-responsive-modal";
import "./MakeEventPage.scss";

const MakeEventPage = () => {
  const [eventName, setEventName] = useState("");
  const [eventSubtitle, setEventSubtitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventProducer, setEventProducer] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventISODateTime, setEventISODateTime] = useState("");
  const [eventDoorsTime, setEventDoorsTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventTicketPrices, setEventTicketPrices] = useState({});
  const [eventBuyTicketsLink, setEventBuyTicketsLink] = useState("");
  const [eventPerformers, setEventPerformers] = useState([]);
  const [eventTicketPriceGA, setEventTicketPriceGA] = useState(0);
  const [eventTicketPriceAdvGA, setEventTicketPriceAdvGA] = useState(0);
  const [eventTicketPriceVIP, setEventTicketPriceVIP] = useState(0);
  const [eventTicketPriceAdvVIP, setEventTicketPriceAdvVIP] = useState(0);
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  async function createEvent(e) {
    e.preventDefault();

    let newEvent = {
      name: eventName,
      subtitle: eventSubtitle,
      description: eventDescription,
      producer: eventProducer,
      city: eventCity,
      venue: eventVenue,
      venueAddress: eventAddress,
      when: {
        timestamp: new Date(eventISODateTime).getTime(),
        day: new Date(eventISODateTime).getDate(),
        month: new Date(eventISODateTime).toLocaleString("default", {
          month: "long",
        }),
        times: {
          doors: eventDoorsTime,
          start: new Date(eventISODateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          end: eventEndTime,
        },
      },
      ticketsLink: eventBuyTicketsLink,
      ticketPrices: eventTicketPrices,
      performers: eventPerformers,
    };
  }

  function openModal(event) {
    event.preventDefault();
    onOpenModal();
  }

  function closeModal() {
    onCloseModal();
  }

  return (
    <main className="make-event">
      <section className="make-event__form">
        <h1 className="make-event__title">New Event</h1>
        <form className="make-event__form">
          <div className="make-event__core-info">
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

            <button className="make-event__upload-img-btn" onClick={openModal}>
              Upload Main Image
            </button>
            <Modal open={open} onClose={closeModal} center>
              <FileUploader></FileUploader>
            </Modal>
          </div>

          <div className="make-event__location-info">
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

          <div className="make-event__time-info">
            <h3 className="make-event__subheading">Date & Time</h3>
            <label>
              Date & Official Start Time
              <input
                type="datetime-local"
                className="make-event__datetime-input"
                onChange={(e) => setEventISODateTime(e.target.value)}
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
          </div>

          <h3 className="make-event__subheading">Performers</h3>

          <div className="make-event__tickets-info">
            <h3 className="make-event__subheading">Tickets</h3>
            <label>
              Link to Buy Tickets
              <input
                type="text"
                className="make-event__text-input"
                onChange={(e) => setEventBuyTicketsLink(e.target.value)}
              />
            </label>

            <div className="make-event__ticket-prices">
              <label>
                Advance GA
                <input
                  type="number"
                  className="make-event__num-input"
                  onChange={(e) => setEventTicketPriceAdvGA(e.target.value)}
                />
              </label>
              <label>
                Advance VIP
                <input
                  type="number"
                  className="make-event__num-input"
                  onChange={(e) => setEventTicketPriceAdvVIP(e.target.value)}
                />
              </label>
              <label>
                GA
                <input
                  type="number"
                  className="make-event__num-input"
                  onChange={(e) => setEventTicketPriceGA(e.target.value)}
                />
              </label>
              <label>
                VIP
                <input
                  type="number"
                  className="make-event__num-input"
                  onChange={(e) => setEventTicketPriceVIP(e.target.value)}
                />
              </label>
            </div>
          </div>

          <button
            className="make-event__submit-btn"
            onClick={(e) => createEvent(e)}
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default MakeEventPage;
