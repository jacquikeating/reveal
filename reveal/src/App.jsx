import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '/src/pages/HomePage/HomePage.jsx';
import AboutPage from '/src/pages/AboutPage/AboutPage.jsx';
import SignupPage from './pages/SignupPage/SignupPage';
import ProfilePage from '/src/pages/ProfilePage/ProfilePage.jsx';
import EventPage from '/src/pages/EventPage/EventPage.jsx';
import EventListingPage from '/src/pages/EventListingsPage/EventListingsPage.jsx';
import VenuePage from '/src/pages/VenuePage/VenuePage.jsx';
import PostPage from '/src/pages/PostPage/PostPage.jsx';
import Header from '/src/components/Header/Header.jsx';
import Footer from '/src/components/Footer/Footer.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/find-events" element={<EventListingPage />} />
          <Route path="/venue" element={<VenuePage />} />
          <Route path="/post" element={<PostPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
