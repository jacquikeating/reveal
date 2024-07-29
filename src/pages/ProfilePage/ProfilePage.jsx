import React, { useState, useEffect, Suspense, lazy } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Hero from "../../components/Hero/Hero";
import Socials from "../../components/Socials/Socials";
import EmblaCarousel from "../../components/EmblaCarousel/EmblaCarousel";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
const Gallery = lazy(() => import("../../components/Gallery/Gallery"));
import {
  getSingleUserEndpoint,
  emptyUserData,
  getEventsListEndpoint,
} from "../../utils/api-utils";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase.js";

import "./ProfilePage.scss";

const ProfilePage = () => {
  let { userName } = useParams();
  const [userData, setUserData] = useState({});
  const [eventIDs, setEventIDs] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { name, bio, cover_photo, events, gallery } = userData;

  let userGallery = [];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Code from Firebase documentation
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("profileURL", "==", `${userName}`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
          setEventIDs(doc.data().events);
        });

        setLoading(false);
        fetchEventsList();
      } catch (error) {
        console.error("Error loading data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const fetchEventsList = async () => {
    try {
      const userEvents = [];

      // Code from Firebase documentation
      const querySnapshot = await getDocs(collection(db, "events"));
      querySnapshot.forEach((doc) => {
        userEvents.push(doc.data());
      });
      setLoading(false);
      userEvents.sort((a, b) => a.day - b.day);
      setEventsData(userEvents);
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
      <Hero img={cover_photo} />
      <main className="profile">
        <section className="profile__section">
          <h1 className="profile__name">{name}</h1>
          <p className="profile__bio">{bio}</p>
          <Socials />
        </section>

        <section className="profile__section">
          <h2 className="profile__section-heading profile__section-heading--events">
            Events
          </h2>
          <EmblaCarousel allEventsList={eventsData} eventIDs={eventIDs} />
        </section>

        <section className="profile__section">
          <h2 className="profile__section-heading">Gallery</h2>
          <Suspense fallback={<p>Loading images...</p>}>
            <Gallery gallery={userData.gallery} />
          </Suspense>
        </section>

        <section className="profile__section">
          <h2 className="profile__section-heading">Posts</h2>
          <PostsContainer desiredID={userName} />
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
