import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase.js";
import {
  getDoc,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import FirestoreUpload from "../../components/FirestoreUpload/FirestoreUpload.jsx";
import "./NewAcctPage.scss";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

// TEST STUFF
import { db } from "../../config/firebase.js";

const NewAcctPage = () => {
  // TEST STUFF  -----------------------------------------------------
  const [eventsList, setEventsList] = useState([]);
  const [newEventName, setNewEventName] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [updatedEventName, setUpdatedEventName] = useState("");

  async function getEventsList() {
    try {
      const res = await getDocs(eventsCollectionRef);
      const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setEventsList(data);
    } catch (error) {
      console.error(error);
    }
  }

  const eventsCollectionRef = collection(db, "events");

  useEffect(() => {
    getEventsList();
  }, []);

  async function handleSubmit() {
    try {
      await addDoc(eventsCollectionRef, {
        name: newEventName,
        date: newEventDate,
        userId: auth?.currentUser?.uid,
      });
      getEventsList();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteEvent(id) {
    const eventDoc = doc(db, "events", id);
    await deleteDoc(eventDoc);
    getEventsList();
  }

  async function updateEvent(id) {
    const eventDoc = doc(db, "events", id);
    await updateDoc(eventDoc, { name: updatedEventName });
    getEventsList();
    // console.log(`Your id: ${request.auth.uid}`);
    // console.log(`Resource user ID: ${request.resource.data.userId}`);
    // console.log(
    //   `The one I know was working earlier: ${auth?.currentUser?.uid}`
    // );
  }

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <main className="new-acct-page">
        <section>
          <div>
            <button onClick={onOpenModal}>Open modal</button>
            <Modal open={open} onClose={onCloseModal} center>
              <FirestoreUpload />
            </Modal>
          </div>
          {/* <FirestoreUpload /> */}
          {/* 
          
          ========= ACTUAL CONTENT =======================================
          <h1>Welcome to Reveal!</h1>
          <p>Your account was successfully created. </p>
          <Link to="/profile/edit">
            <button className="new-acct-page__btn">
              Fill out your profile
            </button>
          </Link>
          <Link to="/">
            <button className="new-acct-page__btn">Return home</button>
          </Link> 
          ================================================================*/}

          {/* TEST CONTENT - CRUD TEST WITH EVENTS 
          {eventsList.map((show) => {
            return (
              <div key={show.id}>
                <p>{show.name}</p>
                <button onClick={() => deleteEvent(show.id)}>
                  Delete event
                </button>
                <input
                  placeholder="Change name"
                  onChange={(e) => {
                    setUpdatedEventName(e.target.value);
                  }}
                />
                <button onClick={() => updateEvent(show.id)}>
                  Update Event
                </button>
              </div>
            );
          })}

          <input
            type="text"
            placeholder="Event name"
            onChange={(e) => setNewEventName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Event date"
            onChange={(e) => setNewEventDate(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
          */}
        </section>
      </main>
    </div>
  );
};

export default NewAcctPage;
