import React, { useState, useEffect } from "react";
import "./NewCommentForm.scss";
import { collection, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase.js";

const NewCommentForm = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [eventsData, setEventsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [citiesData, setCitiesData] = useState([
    "Toronto",
    "Montreal",
    "Vancouver",
  ]);
  const [venuesData, setVenuesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    content: "",
    event: "",
    user: "",
    city: "",
    venue: "",
  });
  const form = document.getElementById("form");
  const [writeComment, setWriteComment] = useState(true);

  //   useEffect(() => {
  //     const fetchEventsData = async () => {
  //       try {
  //         const data = await getDocs(collection(db, "events"));
  //         const firestoreEventsData = [
  //           data.docs.map((doc) => ({
  //             ...doc.data(),
  //           })),
  //         ];
  //         const eventsList = firestoreEventsData[0].map((event) => event.name);
  //         const alphabetizedEventsList = eventsList.sort((a, b) => {
  //           return a.localeCompare(b);
  //         });
  //         setEventsData(alphabetizedEventsList);
  //       } catch (error) {
  //         console.error("Error loading data:", error);
  //       }
  //     };
  //     const fetchUsersData = async () => {
  //       try {
  //         const data = await getDocs(collection(db, "users"));
  //         const firestoreUsersData = [
  //           data.docs.map((doc) => ({
  //             ...doc.data(),
  //           })),
  //         ];
  //         const usersList = firestoreUsersData[0].map((user) => user.name);
  //         const alphabetizedUsersList = usersList.sort((a, b) => {
  //           return a.localeCompare(b);
  //         });
  //         setUsersData(alphabetizedUsersList);
  //       } catch (error) {
  //         console.error("Error loading data:", error);
  //       }
  //     };
  //     // const fetchCitiesData = async () => {
  //     //   try {
  //     //     const data = await getDocs(collection(db, "cities"));
  //     //     const firestoreCitiesData = [
  //     //       data.docs.map((doc) => ({
  //     //         ...doc.data(),
  //     //         id: doc.id,
  //     //       })),
  //     //     ];
  //     // const citiesList = firestoreCitiesData[0].map((city) => city.name);
  //     //     setCitiesData(citiesList);
  //     //   } catch (error) {
  //     //     console.error("Error loading data:", error);
  //     //   }
  //     // };
  //     const fetchVenuesData = async () => {
  //       try {
  //         const data = await getDocs(collection(db, "venues"));
  //         const firestoreVenuesData = [
  //           data.docs.map((doc) => ({
  //             ...doc.data(),
  //             // id: doc.id,
  //           })),
  //         ];
  //         const venuesList = firestoreVenuesData[0].map((venue) => venue.name);
  //         // Comes pre-alphabetized due to Firestore document names
  //         setVenuesData(venuesList);
  //       } catch (error) {
  //         console.error("Error loading data:", error);
  //       }
  //     };
  //     fetchEventsData();
  //     fetchUsersData();
  //     // fetchCitiesData();
  //     fetchVenuesData();
  //   }, []);

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
      userUID: userData.uid,
      userName: userData.name,
      userAvatar: userData.avatar,
      timestamp: new Date().getTime().toString(),
      content: submittedData.content,
      likes: [],
      comments: {},
      hashtags: {
        event: formData.event,
        user: formData.user,
        city: formData.city,
        venue: formData.venue,
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
        content: "",
        user: "",
        event: "",
        city: "",
        venue: "",
      });
      form.reset();
      setWriteComment(false);
    } else {
      console.error("Missing required field");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <form className="comment-form" onSubmit={handleSubmit} id="form">
      {writeComment ? (
        <div className="comment-form__top">
          <img src={userData.avatar} className="comment-form__user-avatar" />
          <textarea
            className="comment-form__content"
            name="content"
            placeholder="Start writing..."
            required
            value={formData.content}
            onChange={handleChange}
          />
        </div>
      ) : (
        ""
      )}

      {/* <div className="comment-form__mentions">
          <p className="comment-form__add-tags-text">
            Add Tags <span>(Optional)</span>
          </p>

          <label className="comment-form__label">
            Person
            <select
              className="comment-form__select"
              name="person"
              onChange={handleChange}
            >
              <option value="null">(none)</option>{" "}
              {usersData.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="comment-form__label">
            Event
            <select
              className="comment-form__select"
              name="event"
              onChange={handleChange}
            >
              <option value="null">(none)</option>{" "}
              {eventsData.map((show) => {
                return (
                  <option key={show} value={show}>
                    {show}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="comment-form__label">
            City
            <select
              className="comment-form__select"
              name="city"
              onChange={handleChange}
            >
              <option value="null">(none)</option>{" "}
              {citiesData.map((city) => {
                return (
                  <option key={city} value={city}>
                    {city}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="comment-form__label">
            Venue
            <select
              className="comment-form__select"
              name="venue"
              onChange={handleChange}
            >
              <option value="null">(none)</option>
              {venuesData.map((venue) => {
                return (
                  <option key={venue} value={venue}>
                    {venue}
                  </option>
                );
              })}
            </select>
          </label>
        </div> */}
      {writeComment ? (
        <button type="submit" className="comment-form__check-btn">
          <img
            className="post__icon post__icon--check"
            src="../../src/assets/icons/check.svg"
          />
        </button>
      ) : (
        ""
      )}
    </form>
  );
};

export default NewCommentForm;
