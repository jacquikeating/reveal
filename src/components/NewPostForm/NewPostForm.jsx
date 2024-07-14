import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./NewPostForm.scss";
import {
  getEventsListEndpoint,
  getUsersListEndpoint,
} from "../../utils/api-utils";

const NewPostForm = () => {
  const [eventsData, setEventsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .all([
            axios.get(getEventsListEndpoint()),
            axios.get(getUsersListEndpoint()),
          ])
          .then(
            axios.spread((...responses) => {
              function alphabetizedData(array) {
                const alphabetizedArray = array.sort((a, b) => {
                  return a.name.localeCompare(b.name);
                });
                return alphabetizedArray;
              }

              const alphabetizedEvents = alphabetizedData(responses[0].data);
              const alphabetizedUsers = alphabetizedData(responses[1].data);

              setEventsData(alphabetizedEvents);
              setUsersData(alphabetizedUsers);
            })
          );
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;
  return (
    <section className="">
      <h2>New Post</h2>

      <form className="post-form" onSubmit={handleSubmit}>
        <div className="post-form__top">
          <img
            src={"src/assets/icons/avatar-placeholder.png"}
            className="post-form__user-avatar"
          />
          <textarea
            className="post-form__content"
            name="content"
            placeholder="Start writing..."
            required
          />
        </div>

        <div className="post-form__mentions">
          <p className="post-form__add-tags-text">
            Add Tags <span>(Optional)</span>
          </p>

          <label className="post-form__label">
            Person
            <select className="post-form__select" name="person">
              <option value="null">(none)</option>{" "}
              {usersData.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="post-form__label">
            Event
            <select className="post-form__select" name="event">
              <option value="null">(none)</option>{" "}
              {eventsData.map((show) => {
                return (
                  <option key={show.id} value={show.id}>
                    {show.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="post-form__label">
            City
            <select className="post-form__select" name="city">
              <option value="null">(none)</option>{" "}
              {eventsData.map((show) => {
                return <option key={show.id}>{show.name}</option>;
              })}
            </select>
          </label>
          <label className="post-form__label">
            Venue
            <select className="post-form__select" name="venue">
              <option value="null">(none)</option>
              {eventsData.map((show) => {
                return <option key={show.id}>{show.name}</option>;
              })}
            </select>
          </label>
        </div>

        <button type="submit" className="post-form__submit-btn">
          Post
        </button>
      </form>
    </section>
  );
};

export default NewPostForm;
