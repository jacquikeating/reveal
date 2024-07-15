import "./EditProfilePage.scss";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Hero from "../../components/Hero/Hero";
import EditSocials from "../../components/EditSocials/EditSocials";
import EmblaCarousel from "../../components/EmblaCarousel/EmblaCarousel";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
const Gallery = lazy(() => import("../../components/Gallery/Gallery"));
import {
  getSingleUserEndpoint,
  emptyUserData,
  getEventsListEndpoint,
} from "../../utils/api-utils";

const EditProfilePage = () => {
  const [loggedInUser, setLoggedInUser] = useState(6);
  const [userData, setUserData] = useState(emptyUserData);
  const [eventIDs, setEventIDs] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { name, bio, cover_photo, events, gallery } = userData;

  let userGallery = [];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(getSingleUserEndpoint(loggedInUser));
        setUserData(response.data);
        setLoading(false);
        setEventIDs(response.data.events);
        fetchEventsList();
      } catch (error) {
        console.error("Error loading data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [loggedInUser]);

  const fetchEventsList = async () => {
    try {
      const response = await axios.get(getEventsListEndpoint());
      setEventsData(response.data);
      setLoading(false);
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
      <main className="edit-profile">
        <section className="edit-profile__section">
          <input type="text" className="edit-profile__name" value={name} />
          <textarea className="edit-profile__bio">{bio}</textarea>

          <EditSocials />
          {/* <div className="edit-profile__socials">
            <fieldset name="socials">
              <div className="socials__option">
                <img
                  className="socials__icon socials__icon-fb"
                  src="../../src/assets/icons/social-fb.svg"
                />
                <input type="text" name="facebook" />
                <img
                  className="socials__delete"
                  src="../../src/assets/icons/trash.svg"
                />
              </div>

              <input type="text" name="instagram" />
              <input type="text" name="twitter" />
              <input type="text" name="tiktok" />
            </fieldset>
          </div> */}
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
            <Gallery gallery={userData.gallery} showEdit={true} />
          </Suspense>
        </section>

        <section className="profile__section">
          <h2 className="profile__section-heading">Posts</h2>
          <PostsContainer desiredID={loggedInUser} />
        </section>
      </main>
    </>
  );
};

export default EditProfilePage;
