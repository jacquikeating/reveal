import React from "react";
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../config/firebase.js";
import {
  getDoc,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import "./TestPage.scss";

const TestPage = () => {
  const [eventsList, setEventsList] = useState([]);
  const [newEventName, setNewEventName] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [updatedEventName, setUpdatedEventName] = useState("");
  const eventsCollectionRef = collection(db, "events");

  useEffect(() => {
    getEventsList();
  }, []);

  async function getEventsList() {
    try {
      const res = await getDocs(eventsCollectionRef);
      const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setEventsList(data);
    } catch (error) {
      console.error(error);
    }
  }

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

  return (
    <div>
      <main className="test-page">
        <section>
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
        </section>
      </main>
    </div>
  );
};
export default TestPage;
