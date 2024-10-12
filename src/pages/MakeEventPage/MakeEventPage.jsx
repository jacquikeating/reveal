import { useState } from "react";
import { collection, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import FileUploader from "../../components/FirestoreUpload/FirestoreUpload";
import { Modal } from "react-responsive-modal";
import "./MakeEventPage.scss";

const MakeEventPage = () => {
  // const [eventName, setEventName] = useState("");
  // const [eventSubtitle, setEventSubtitle] = useState("");
  // const [eventDescription, setEventDescription] = useState("");
  // const [eventProducer, setEventProducer] = useState("");
  // const [eventCity, setEventCity] = useState("");
  // const [eventVenue, setEventVenue] = useState("");
  // const [eventAddress, setEventAddress] = useState("");
  // const [eventISODateTime, setEventISODateTime] = useState("");
  // const [eventDoorsTime, setEventDoorsTime] = useState("");
  // const [eventEndTime, setEventEndTime] = useState("");
  // const [eventTicketPrices, setEventTicketPrices] = useState({});
  // const [eventBuyTicketsLink, setEventBuyTicketsLink] = useState("");
  // const [eventPerformers, setEventPerformers] = useState([]);
  // const [eventTicketPriceGA, setEventTicketPriceGA] = useState(0);
  // const [eventTicketPriceAdvGA, setEventTicketPriceAdvGA] = useState(0);
  // const [eventTicketPriceVIP, setEventTicketPriceVIP] = useState(0);
  // const [eventTicketPriceAdvVIP, setEventTicketPriceAdvVIP] = useState(0);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    description: "",
    // main_image: "",
    organizer: "",
    where: {
      city: "",
      venueName: "",
      venueAddress: "",
      venueURL: "",
    },
    when: {
      ISODateTime: "",
      times: {
        doors: "",
        end: "",
      },
    },
    tickets: {
      purchaseURL: "",
      prices: {
        GA: 0,
        VIP: 0,
        advGA: 0,
        advVIP: 0,
        // standing: 0,
      },
      // tableDiscounts: false,
    },
  });
  const form = document.getElementById("form");

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.content) formErrors.content = "This field is required";
    return formErrors;
  };

  const prepareFormData = (submittedData) => {
    let preparedFormData = {
      name: formData.name,
      subtitle: formData.subtitle,
      description: formData.description,
      // main_image: formData.main_image,
      organizer: formData.organizer,
      performers: [],
      gallery: [],
      where: {
        city: formData.where.city,
        venueName: formData.where.venueName,
        venueAddress: formData.where.venueAddress,
        venueURL: formData.where.venueURL,
      },
      when: {
        ISODateTime: formData.where.ISODateTime,
        timestamp: new Date(formData.where.ISODateTime).getTime(),
        day: new Date(formData.where.ISODateTime).getDate(),
        month: new Date(formData.where.ISODateTime).toLocaleString("default", {
          month: "long",
        }),
        year: 0,
        times: {
          doors: formData.when.times.doors,
          start: new Date(formData.where.ISODateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          end: formData.when.times.end,
        },
      },
      tickets: {
        purchaseURL: formData.tickets.purchaseURL,
        prices: {
          GA: formData.tickets.prices.GA,
          VIP: formData.tickets.prices.VIP,
          advGA: formData.tickets.prices.advGA,
          advVIP: formData.tickets.prices.advVIP,
          // standing: 0,
        },
        // tableDiscounts: formData.tickets.tableDiscounts,
      },
    };
    Reflect.deleteProperty(submittedData, "content");
    const data = Array.isArray(submittedData)
      ? submittedData.filter(Boolean)
      : submittedData;
    const trimmedHashtags = Object.keys(data).reduce(
      (acc, key) => {
        const value = data[key];

        if (Boolean(value))
          acc[key] = typeof value === "object" ? compactObject(value) : value;
        return acc;
      },
      Array.isArray(submittedData) ? [] : {}
    );
    preparedFormData.hashtags = trimmedHashtags;
    return preparedFormData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      const dataToSubmit = prepareFormData(formData);
      const docRef = await addDoc(collection(db, "posts"), dataToSubmit);
      const docID = docRef.id;
      await updateDoc(docRef, {
        id: docID,
      });
      setFormData({
        name: "",
        subtitle: "",
        description: "",
        // main_image: "",
        organizer: "",
        where: {
          city: "",
          venueName: "",
          venueAddress: "",
          venueURL: "",
        },
        when: {
          ISODateTime: "",
          times: {
            doors: "",
            end: "",
          },
        },
        tickets: {
          purchaseURL: "",
          prices: {
            GA: 0,
            VIP: 0,
            advGA: 0,
            advVIP: 0,
            // standing: 0,
          },
          // tableDiscounts: false,
        },
      });
      form.reset();
    } else {
      console.error("Missing required field");
    }
  };

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
                name="name"
                className="make-event__name"
                onChange={handleChange}
              />
            </label>
            <label>
              Subtitle
              <input
                type="text"
                name="subtitle"
                className="make-event__subtitle"
                onChange={handleChange}
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                className="make-event__description"
                onChange={handleChange}
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
                name="where.city"
                className="make-event__select-city"
                // defaultValue={selectedCity}
                onChange={handleChange}
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
                name="where.venueName"
                className="make-event__text-input"
                onChange={handleChange}
              />
            </label>
            <label>
              Venue Address
              <input
                type="text"
                name="where.venueAddress"
                className="make-event__text-input"
                onChange={handleChange}
              />
            </label>
            <label>
              Venue URL
              <input
                type="text"
                name="where.venueURL"
                className="make-event__text-input"
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="make-event__time-info">
            <h3 className="make-event__subheading">Date & Time</h3>
            <label>
              Date & Official Start Time
              <input
                type="datetime-local"
                name="when.ISODateTime"
                className="make-event__datetime-input"
                onChange={handleChange}
              />
            </label>

            <label>
              Doors Time
              <input
                type="time"
                name="when.times.doors"
                className="make-event__time-input"
                onChange={handleChange}
              />
            </label>

            <label>
              End Time
              <input
                type="time"
                name="when.times.end"
                className="make-event__time-input"
                onChange={handleChange}
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
                name="tickets.purchaseURL"
                className="make-event__text-input"
                onChange={handleChange}
              />
            </label>

            <div className="make-event__ticket-prices">
              <label>
                Advance GA
                <input
                  type="number"
                  name="tickets.prices.advGA"
                  className="make-event__num-input"
                  onChange={handleChange}
                />
              </label>
              <label>
                Advance VIP
                <input
                  type="number"
                  name="tickets.prices.advVIP"
                  className="make-event__num-input"
                  onChange={handleChange}
                />
              </label>
              <label>
                GA
                <input
                  type="number"
                  name="tickets.prices.GA"
                  className="make-event__num-input"
                  onChange={handleChange}
                />
              </label>
              <label>
                VIP
                <input
                  type="number"
                  name="tickets.prices.VIP"
                  className="make-event__num-input"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <button
            className="make-event__submit-btn"
            // onClick={(e) => createEvent(e)}
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default MakeEventPage;
