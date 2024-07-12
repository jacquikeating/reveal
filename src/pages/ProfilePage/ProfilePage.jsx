import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Hero from "../../components/Hero/Hero";
import Socials from "../../components/Socials/Socials";
import EmblaCarousel from "../../components/EmblaCarousel/EmblaCarousel";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
import { getSingleUserEndpoint } from "../../utils/api-utils";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const emptyUserData = {
    name: "Unknown Name",
    bio: "No bio available",
    cover_photo: "/src/assets/icons/arrow-right.svg",
  };

  const { userID } = useParams();
  const [userData, setUserData] = useState(emptyUserData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { name, bio, cover_photo } = userData;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(getSingleUserEndpoint(userID));
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  const eventsData = [
    {
      id: 1,
      name: "A",
      month: "July",
      day: "20",
      main_image: "/src/assets/image-placeholder.png",
    },
    {
      id: 2,
      name: "B",
      month: "July",
      day: "20",
      main_image: "/src/assets/image-placeholder.png",
    },
    {
      id: 3,
      name: "C",
      month: "July",
      day: "20",
      main_image: "/src/assets/image-placeholder.png",
    },
    {
      id: 4,
      name: "D",
      month: "July",
      day: "20",
      main_image: "/src/assets/image-placeholder.png",
    },
  ];

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
          <h2 className="profile__section-heading">Events</h2>
          <EmblaCarousel eventsData={eventsData} />
        </section>

        <section className="profile__section">
          <h2 className="profile__section-heading">Gallery</h2>
        </section>

        <section className="profile__section">
          <h2 className="profile__section-heading">Posts</h2>
          <PostsContainer />
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
