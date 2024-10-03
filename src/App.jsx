import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config/firebase.js";
import { ToastContainer } from "react-toastify";
import HomePage from "/src/pages/HomePage/HomePage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "/src/pages/ProfilePage/ProfilePage.jsx";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import EventDetailsPage from "/src/pages/EventDetailsPage/EventDetailsPage.jsx";
import EventListingsPage from "/src/pages/EventListingsPage/EventListingsPage.jsx";
import VenuePage from "/src/pages/VenuePage/VenuePage.jsx";
import PostPage from "/src/pages/PostPage/PostPage.jsx";
import NewPostPage from "./pages/NewPostPage/NewPostPage";
import EditPostPage from "./pages/EditPostPage/EditPostPage";
import Header from "/src/components/Header/Header.jsx";
import Footer from "/src/components/Footer/Footer.jsx";
import NewAcctPage from "./pages/NewAcctPage/NewAcctPage";
import TestPage from "./pages/TestPage/TestPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import MakeEventPage from "./pages/MakeEventPage/MakeEventPage";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [uid, setUid] = useState(null);
  const [url, setUrl] = useState(null);
  const [userData, setUserData] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName } = user;
        setUid(uid);
        setUrl(`/profile/${displayName}`);

        const fetchUserData = async () => {
          try {
            const docRef = doc(db, "users", `${uid}`);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setUserData(docSnap.data());
              localStorage.setItem("userData", JSON.stringify(docSnap.data()));
            } else {
              console.log("Cannot find that user in the database.");
            }
          } catch (error) {
            console.error("Error loading data:", error);
          }
        };
        fetchUserData();
      } else {
        setUserData(null);
      }
    });
  }, []);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage userData={userData} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/welcome" element={<NewAcctPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile/edit"
            element={<EditProfilePage userData={userData} />}
          />
          <Route path="/profile/:profileURL" element={<ProfilePage />} />
          <Route path="/events" element={<EventListingsPage />} />
          <Route path="/events/:eventID" element={<EventDetailsPage />} />
          <Route path="/venue" element={<VenuePage />} />
          <Route path="/post" element={<NewPostPage />} />
          <Route path="/post/:postID" element={<PostPage />} />
          <Route path="/post/:postID/edit" element={<EditPostPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route
            path="/account"
            element={<AccountPage userData={userData} />}
          />
          <Route path="/events/new" element={<MakeEventPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
