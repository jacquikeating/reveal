import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
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
import Auth from "./components/Auth/Auth";
import "./App.scss";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(6);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/welcome" element={<NewAcctPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={<Navigate replace to={`/profile/${loggedInUser}`} />}
          />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/profile/:userID" element={<ProfilePage />} />
          <Route path="/events" element={<EventListingsPage />} />
          <Route path="/events/:eventID" element={<EventDetailsPage />} />
          <Route path="/venue" element={<VenuePage />} />
          <Route path="/post" element={<NewPostPage />} />
          <Route path="/post/:postID" element={<PostPage />} />
          <Route path="/post/:postID/edit" element={<EditPostPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
