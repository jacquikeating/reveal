import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../../components/Post/Post";
import {
  getPostsListEndpoint,
  getFilteredPostsListEndpoint,
} from "../../utils/api-utils";
import "./PostsContainer.scss";

const PostsContainer = ({ desiredID }) => {
  const loggedInUser = desiredID || 1;

  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const returnEndpoint = () => {
    if (desiredID) {
      return getFilteredPostsListEndpoint(desiredID);
    } else {
      return getPostsListEndpoint();
    }
  };

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const response = await axios.get(returnEndpoint());
        setPostsData(response.data.reverse().slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPostsData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <ul className="posts-container">
      {postsData.map((post) => {
        return (
          <li className="post" key={post.id}>
            <Post postData={post} loggedInUser={loggedInUser} />
          </li>
        );
      })}
    </ul>
  );
};

export default PostsContainer;
