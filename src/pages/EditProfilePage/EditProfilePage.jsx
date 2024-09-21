import "./EditProfilePage.scss";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import Hero from "../../components/Hero/Hero";
import EditSocials from "../../components/EditSocials/EditSocials";
import EmblaCarousel from "../../components/EmblaCarousel/EmblaCarousel";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
const Gallery = lazy(() => import("../../components/Gallery/Gallery"));

const EditProfilePage = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [name, setName] = useState(userData.name);
  const [bio, setBio] = useState(userData.bio);
  const [eventsData, setEventsData] = useState([]);
  const navigate = useNavigate();
  const userRef = doc(db, "users", userData.uid);
  let inputValues = {
    name: name,
    bio: bio,
  };
  const updatedUserData = { ...userData, ...inputValues };

  useEffect(() => {
    if (userData.events) {
      const fetchEventsData = async () => {
        try {
          const data = await getDocs(collection(db, "events"));
          const firestoreEventsData = [
            data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })),
          ];
          let onlyUsersShows = firestoreEventsData[0].filter((show) =>
            userData.events.includes(show.id)
          );
          onlyUsersShows.sort((a, b) => a.when.timestamp - b.when.timestamp);
          setEventsData(onlyUsersShows);
        } catch (error) {
          console.error("Error loading data:", error);
        }
      };
      fetchEventsData();
    }
  }, []);

  async function saveData() {
    await updateDoc(userRef, updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    navigate(`/profile/${userData.profileURL}`);
  }

  return (
    <>
      {userData ? (
        <>
          <Hero showEdit={true} />
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

            <section className="profile__section">
              <h2 className="profile__section-heading profile__section-heading--events">
                Events
              </h2>
              {userData.events ? (
                <EmblaCarousel
                  eventsData={eventsData}
                  eventIDs={userData.events}
                />
              ) : (
                <p>You are not in any events!</p>
              )}
            </section>

            <section className="edit-profile__section">
              <h2 className="edit-profile__section-heading">Gallery</h2>
              <Suspense fallback={<p>Loading images...</p>}>
                <Gallery gallery={userData.gallery} showEdit={true} />
              </Suspense>
            </section>

            <section className="profile__section">
              <h2 className="profile__section-heading">Posts</h2>
              <PostsContainer
                filterType={"userName"}
                filterTarget={userData.name}
              />
            </section>

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
