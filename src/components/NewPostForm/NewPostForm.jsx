import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewPostForm.scss";
import {
  getEventsListEndpoint,
  getUsersListEndpoint,
  getPostsListEndpoint,
  convertFormToJson,
} from "../../utils/api-utils";

const NewPostForm = () => {
  const loggedInUser = {
    id: 3,
    name: "Jasper Jinx",
    avatar:
      "https://reveal-images.s3.us-east-2.amazonaws.com/jasperjinx-main.jpg",
  };

  //   const [loggedInUser, setLoggedInUser] = useState(fakeUser);
  const [eventsData, setEventsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    content: "",
    event: null,
    user: null,
    city: null,
    venue: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.content) formErrors.content = "This field is required";
    return formErrors;
  };

  const prepareFormData = (submittedData) => {
    let preparedFormData = {
      user_id: loggedInUser.id,
      user_name: loggedInUser.name,
      timestamp: new Date().getTime(),
      avatar: loggedInUser.avatar,
      content: submittedData.content,
      likes: 0,
      comments: {},
      hashtags: {},
    };
    Reflect.deleteProperty(submittedData, "content");
    const data = Array.isArray(submittedData)
      ? submittedData.filter(Boolean)
      : submittedData;
    const trimmedHashtags = Object.keys(data).reduce(
      (acc, key) => {
        const value = data[key];

        if (Boolean(value))
          acc[key] = typeof value === "object" ? compactObject(value) : value;
        return acc;
      },
      Array.isArray(submittedData) ? [] : {}
    );
    preparedFormData.hashtags = trimmedHashtags;
    return preparedFormData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      const preparedData = prepareFormData(formData);
      //   const stringifiedData = JSON.stringify(preparedData);
      const dataToSubmit = preparedData;
      console.log(dataToSubmit);
      const res = await axios.post(getPostsListEndpoint(), dataToSubmit);
      if (res.status != 201) {
        console.error(
          "Something went wrong during POST operation! (%d) %s",
          res.status,
          res.data
        );
      } else {
        console.debug("Post added successfully: %s", JSON.stringify(res.data));
      }
    } else {
      console.error("Missing required field");
    }
  };

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <section>
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
            onChange={handleChange}
          />
        </div>

        <div className="post-form__mentions">
          <p className="post-form__add-tags-text">
            Add Tags <span>(Optional)</span>
          </p>

          <label className="post-form__label">
            Person
            <select
              className="post-form__select"
              name="person"
              onChange={handleChange}
            >
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
            <select
              className="post-form__select"
              name="event"
              onChange={handleChange}
            >
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
            <select
              className="post-form__select"
              name="city"
              onChange={handleChange}
            >
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
            Venue
            <select
              className="post-form__select"
              name="venue"
              onChange={handleChange}
            >
              <option value="null">(none)</option>
              {eventsData.map((show) => {
                return (
                  <option key={show.id} value={show.id}>
                    {show.name}
                  </option>
                );
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
