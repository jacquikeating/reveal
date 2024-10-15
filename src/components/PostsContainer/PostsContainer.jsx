import React, { useState, useEffect } from "react";
import Post from "../../components/Post/Post";
import { db } from "../../config/firebase.js";
import { collection, query, where, getDocs, or } from "firebase/firestore";
import "./PostsContainer.scss";

const PostsContainer = ({ filterType, filterTarget }) => {
  // filterType determines which query will be used (user/event/etc)
  // filterTarget is the actual "search term"
  const [postsData, setPostsData] = useState([]); // array of posts from backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchPostsData = async () => {
      let q = "";
      let postsArray = [];
      try {
        if (!filterType && !filterTarget) {
          const data = await getDocs(collection(db, "posts"));
          const firestorePostsData = [
            data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })),
          ];
          postsArray = firestorePostsData[0].slice(0, 10);
          postsArray.sort((a, b) => b.likes.length - a.likes.length);
        } else {
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
          querySnapshot.forEach((doc) => {
            postsArray.push(doc.data());
          });
          postsArray.sort((a, b) => b.timestamp - a.timestamp);
        }
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
            <Post postData={post} userData={userData} />
          </li>
        );
      })}
    </ul>
  );
};

export default PostsContainer;
