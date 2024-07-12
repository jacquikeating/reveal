import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "/src/pages/HomePage/HomePage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "/src/pages/ProfilePage/ProfilePage.jsx";
import EventDetailsPage from "/src/pages/EventDetailsPage/EventDetailsPage.jsx";
import EventListingsPage from "/src/pages/EventListingsPage/EventListingsPage.jsx";
import VenuePage from "/src/pages/VenuePage/VenuePage.jsx";
import PostPage from "/src/pages/PostPage/PostPage.jsx";
import Header from "/src/components/Header/Header.jsx";
import Footer from "/src/components/Footer/Footer.jsx";
import "./App.scss";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(6);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={<Navigate replace to={`/profile/${loggedInUser}`} />}
          />
          <Route path="/profile/:userID" element={<ProfilePage />} />
          <Route path="/events" element={<EventListingsPage />} />
          <Route path="/events/:eventID" element={<EventDetailsPage />} />
          <Route path="/venue" element={<VenuePage />} />
          <Route path="/post" element={<PostPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
