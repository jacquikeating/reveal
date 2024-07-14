import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Post from "../../components/Post/Post";
import { emptyPostsData, getPostsListEndpoint } from "../../utils/api-utils";
import "./PostsContainer.scss";

const PostsContainer = () => {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const response = await axios.get(getPostsListEndpoint());
        setPostsData(response.data);
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
            <Post postData={post} />
          </li>
        );
      })}
    </ul>
  );
};

export default PostsContainer;
