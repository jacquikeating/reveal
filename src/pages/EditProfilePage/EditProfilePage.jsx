import "./EditProfilePage.scss";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { Link, useParams } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import Hero from "../../components/Hero/Hero";
import EditSocials from "../../components/EditSocials/EditSocials";
import EmblaCarousel from "../../components/EmblaCarousel/EmblaCarousel";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
const Gallery = lazy(() => import("../../components/Gallery/Gallery"));

const EditProfilePage = ({ userData }) => {
  const [name, setName] = useState(userData.name);
  const [editName, setEditName] = useState(false);

  function updateName() {
    setEditName(false);
    console.log("edited");
  }

  return (
    <>
      <Hero img={userData.cover_photo} />
      <main className="edit-profile">
        <section className="edit-profile__section">
          {editName ? (
            <div className="edit-profile__element">
              <input
                type="text"
                className="edit-profile__name"
                defaultValue={userData.name}
              />
              <button
                className="edit-profile__close-editor-button"
                onClick={updateName}
              >
                <img
                  src="/src/assets/icons/check.svg"
                  alt="Check icon"
                  className="edit-profile__icon"
                />
              </button>
            </div>
          ) : (
            <div className="edit-profile__element">
              <h1>{userData.name}</h1>
              <button
                className="edit-profile__open-editor-button"
                onClick={setEditName(true)}
              >
                <img src="/src/assets/icons/edit.svg" alt="Edit icon" />
              </button>
            </div>
          )}

          <textarea
            className="edit-profile__bio"
            defaultValue={userData.bio}
          ></textarea>
          <EditSocials />
        </section>
        {/* 
        <section className="profile__section">
          <h2 className="profile__section-heading profile__section-heading--events">
            Events
          </h2>
          <EmblaCarousel allEventsList={eventsData} eventIDs={eventIDs} />
        </section> */}

        <section className="profile__section">
          <h2 className="profile__section-heading">Gallery</h2>
          <Suspense fallback={<p>Loading images...</p>}>
            <Gallery gallery={userData.gallery} showEdit={true} />
          </Suspense>
        </section>

        {/* <section className="profile__section">
          <h2 className="profile__section-heading">Posts</h2>
          <PostsContainer desiredID={loggedInUser} />
        </section> */}
      </main>
    </>
  );
};

export default EditProfilePage;
