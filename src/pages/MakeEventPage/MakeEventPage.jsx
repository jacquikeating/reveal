import { useState } from "react";
import { collection, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import FileUploader from "../../components/FirestoreUpload/FirestoreUpload";
import { Modal } from "react-responsive-modal";
import "./MakeEventPage.scss";

const MakeEventPage = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    description: "",
    organizer: "",
    // main_image: "",
    // organizer: "",
    city: "",
    venueName: "",
    venueAddress: "",
    venueURL: "",
    ISODateTime: "",
    doorsTime: "",
    endTime: "",
    ticketsPurchaseURL: "",
    GA: 0,
    VIP: 0,
    advGA: 0,
    advVIP: 0,
    // standing: 0,

    // tableDiscounts: false,
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
        city: formData.city,
        venueName: formData.venueName,
        venueAddress: formData.venueAddress,
        venueURL: formData.venueURL,
      },
      when: {
        ISODateTime: formData.ISODateTime,
        timestamp: new Date(formData.ISODateTime).getTime(),
        day: new Date(formData.ISODateTime).getDate(),
        month: new Date(formData.ISODateTime).toLocaleString("default", {
          month: "long",
        }),
        year: new Date(formData.ISODateTime).getFullYear(),
        times: {
          doors: formData.doorsTime,
          start: new Date(formData.ISODateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          end: formData.endTime,
        },
      },
      tickets: {
        purchaseURL: formData.ticketsPurchaseURL,
        prices: {
          GA: formData.GA,
          VIP: formData.VIP,
          advGA: formData.advGA,
          advVIP: formData.advVIP,
          // standing: 0,
        },
        // tableDiscounts: formData.tickets.tableDiscounts,
      },
    };
    Reflect.deleteProperty(submittedData, "content");
    const data = Array.isArray(submittedData)
      ? submittedData.filter(Boolean)
      : submittedData;
    // const trimmedHashtags = Object.keys(data).reduce(
    //   (acc, key) => {
    //     const value = data[key];

    //     if (Boolean(value))
    //       acc[key] = typeof value === "object" ? compactObject(value) : value;
    //     return acc;
    //   },
    //   Array.isArray(submittedData) ? [] : {}
    // );
    // preparedFormData.hashtags = trimmedHashtags;
    return preparedFormData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formErrors = validate();
    // if (Object.keys(formErrors).length === 0) {
    const dataToSubmit = prepareFormData(formData);
    const docRef = await addDoc(collection(db, "events"), dataToSubmit);
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
      city: "",
      venueName: "",
      venueAddress: "",
      venueURL: "",

      ISODateTime: "",
      doorsTime: "",
      endTime: "",
      ticketsPurchaseURL: "",
      GA: 0,
      VIP: 0,
      advGA: 0,
      advVIP: 0,
      // standing: 0,
      // tableDiscounts: false,
    });
    form.reset();
    // } else {
    //   console.error("Missing required field");
    // }
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
        <form className="make-event__form" id="form" onSubmit={handleSubmit}>
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

            <label>
              Organizer
              <input
                type="text"
                name="organizer"
                className="make-event__organizer"
                onChange={handleChange}
              />
            </label>

            {/* <button className="make-event__upload-img-btn" onClick={openModal}>
              Upload Main Image
            </button>
            <Modal open={open} onClose={closeModal} center>
              <FileUploader></FileUploader>
            </Modal> */}
          </div>

          <div className="make-event__location-info">
            <h3 className="make-event__subheading">Location</h3>
            <label>
              City
              <select
                name="city"
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
                name="venueName"
                className="make-event__text-input"
                onChange={handleChange}
              />
            </label>
            <label>
              Venue Address
              <input
                type="text"
                name="venueAddress"
                className="make-event__text-input"
                onChange={handleChange}
              />
            </label>
            <label>
              Venue URL
              <input
                type="text"
                name="venueURL"
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
                name="ISODateTime"
                className="make-event__datetime-input"
                onChange={handleChange}
              />
            </label>

            <label>
              Doors Time
              <input
                type="time"
                name="doorsTime"
                className="make-event__time-input"
                onChange={handleChange}
              />
            </label>

            <label>
              End Time
              <input
                type="time"
                name="endTime"
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
                name="ticketsPurchaseURL"
                className="make-event__text-input"
                onChange={handleChange}
              />
            </label>

            <div className="make-event__ticket-prices">
              <label>
                Advance GA
                <input
                  type="number"
                  name="advGA"
                  className="make-event__num-input"
                  onChange={handleChange}
                />
              </label>
              <label>
                Advance VIP
                <input
                  type="number"
                  name="advVIP"
                  className="make-event__num-input"
                  onChange={handleChange}
                />
              </label>
              <label>
                GA
                <input
                  type="number"
                  name="GA"
                  className="make-event__num-input"
                  onChange={handleChange}
                />
              </label>
              <label>
                VIP
                <input
                  type="number"
                  name="VIP"
                  className="make-event__num-input"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <button type="submit" className="make-event__submit-btn">
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default MakeEventPage;
