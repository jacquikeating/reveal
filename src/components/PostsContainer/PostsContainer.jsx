import React, { useState, useEffect } from "react";
import Post from "../../components/Post/Post";
import { db } from "../../config/firebase.js";
import { collection, query, where, getDocs, or } from "firebase/firestore";
import "./PostsContainer.scss";

const PostsContainer = ({ filterType, filterTarget }) => {
  // const filterType = "userName";
  // const filterTarget = "Cherie Fatale";
  // Hardcoded for early development; will be passed as props: filterType, filterTarget
  // filterType helps handler fucntions for user/event/whatever
  // filterTarget is the actual "search term"
  const [postsData, setPostsData] = useState([]); // array of posts from backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostsData = async () => {
      let q = "";
      try {
        if (filterType == "userName") {
          q = query(
            collection(db, "posts"),
            or(
              where(`${filterType}`, "==", `${filterTarget}`),
              where("hashtags.person", "==", `${filterTarget}`)
            )
          );
        } else {
          q = query(
            collection(db, "posts"),
            where(`${filterType}`, "==", `${filterTarget}`)
          );
        }
        const querySnapshot = await getDocs(q);
        const postsArray = [];
        querySnapshot.forEach((doc) => {
          postsArray.push(doc.data());
        });
        setPostsData(postsArray);
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
          <li className="posts-container__item" key={post.timestamp}>
            <Post postData={post} />
          </li>
        );
      })}
    </ul>
  );
};

export default PostsContainer;
