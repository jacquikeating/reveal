import React, { useState, useEffect, Suspense, lazy } from "react";
import { Link, useParams } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import Socials from "../../components/Socials/Socials";
import EmblaCarousel from "../../components/EmblaCarousel/EmblaCarousel";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
const Gallery = lazy(() => import("../../components/Gallery/Gallery"));
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase.js";

import "./ProfilePage.scss";

const ProfilePage = () => {
  let { userName } = useParams();
  const [profileData, setProfileData] = useState({});
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { name, bio, coverImg, events, gallery } = profileData;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("profileURL", "==", `${userName}`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setProfileData(doc.data());
          fetchEventsData(doc.data().events);
        });
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const fetchEventsData = async (eventsArr) => {
    try {
      const data = await getDocs(collection(db, "events"));
      const firestoreEventsData = [
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })),
      ];

      let onlyUsersShows = firestoreEventsData[0].filter((show) =>
        eventsArr.includes(show.id)
      );
      onlyUsersShows.sort((a, b) => a.when.timestamp - b.when.timestamp);
      setEventsData(onlyUsersShows);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <>
      <Hero img={coverImg} />
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
          {profileData.events ? (
            <EmblaCarousel
              eventsData={eventsData}
              eventIDs={profileData.events}
            />
          ) : (
            <p>This profile is not in any events... yet!</p>
          )}
        </section>

        <section className="profile__section">
          <h2 className="profile__section-heading">Gallery</h2>
          <Suspense fallback={<p>Loading images...</p>}>
            <Gallery gallery={profileData.gallery} />
          </Suspense>
        </section>

        <section className="profile__section">
          <h2 className="profile__section-heading">Posts</h2>
          <PostsContainer
            filterType={"userName"}
            filterTarget={profileData.name}
          />
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
