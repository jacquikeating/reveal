import "./EditProfilePage.scss";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import Hero from "../../components/Hero/Hero";
import EditSocials from "../../components/EditSocials/EditSocials";
import EmblaCarousel from "../../components/EmblaCarousel/EmblaCarousel";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
const Gallery = lazy(() => import("../../components/Gallery/Gallery"));

const EditProfilePage = ({ userData }) => {
  const [name, setName] = useState(userData.name);
  const [bio, setBio] = useState(userData.bio);

  const userRef = doc(db, "users", userData.uid);
  let valuesToUpdate = [];
  let bbb = {};

  function aaa() {
    for (let i = 0; i < valuesToUpdate.length; i++) {
      bbb[valuesToUpdate[i]] = valuesToUpdate[i];
    }

    console.log(bbb);
  }

  async function saveData() {
    if (name !== userData.name) {
      valuesToUpdate.push("name");
    }
    if (bio !== userData.bio) {
      valuesToUpdate.push("bio");
    }

    // console.log(valuesToUpdate);
    aaa();

    if (valuesToUpdate) {
      await updateDoc(userRef, {
        bbb,
      });
    }
  }
  return (
    <>
      {userData ? (
        <>
          <Hero img={userData.cover_photo} />
          <main className="edit-profile">
            <section className="edit-profile__section">
              <input
                type="text"
                className="edit-profile__name"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                className="edit-profile__bio"
                defaultValue={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>

              <EditSocials />
            </section>

            {/* <section className="profile__section">
              <h2 className="profile__section-heading profile__section-heading--events">
                Events
              </h2>
              <EmblaCarousel allEventsList={eventsData} eventIDs={eventIDs} />
            </section> */}

            <section className="edit-profile__section">
              <h2 className="edit-profile__section-heading">Gallery</h2>
              <Suspense fallback={<p>Loading images...</p>}>
                <Gallery gallery={userData.gallery} showEdit={true} />
              </Suspense>
            </section>
            {/* 
            <section className="profile__section">
              <h2 className="profile__section-heading">Posts</h2>
              <PostsContainer desiredID={loggedInUser} />
            </section> */}

            <button className="save-btn" onClick={saveData}>
              <p className="save-btn__text">Save</p>
              <img
                src="/src/assets/icons/check.svg"
                className="save-btn__icon"
                alt="Check icon"
              />
            </button>
          </main>
        </>
      ) : (
        <p>Could not retrieve your profile information. Please try again.</p>
      )}
    </>
  );
};

export default EditProfilePage;
