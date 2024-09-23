import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
// import {
//   getSinglePostEndpoint,
//   putPostEndpoint,
// } from "../../utils/api-utils.js";
import "./Post.scss";

// const [postLikes, setPostLikes] = useState(likes);
// const currentLikes = Number(postLikes);

const Post = ({ postData, userData }) => {
  let {
    userAvatar,
    userProfileURL,
    userName,
    timestamp,
    content,
    likes,
    hashtags,
    comments,
  } = postData;
  comments = [];
  if (timestamp.length === 13) {
    timestamp = new Intl.DateTimeFormat("en-US").format(timestamp);
  }
  content = content.replace(/&#x27;/g, "'");
  // likes is an array containing the UIDs of all users who have liked the post
  const [likesCount, setLikesCount] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(likes.includes(userData.uid));

  // async function addLikes() {
  //   console.log(`current likes: ${likes}`);
  //   const newLikesCount = Number(likes) + 1;
  //   console.log(`new likes: ${newLikesCount}`);
  async function addLikes() {

  //   const updatedPost = { ...postData, likes: newLikesCount };
  //   console.log(updatedPost);

  //   try {
  //     const newLikesCount = Number(likes) + 1;
  //     const updatedPost = { ...postData, likes: newLikesCount };

  //     await axios.put(putPostEndpoint(id), updatedPost);
  //   } catch (error) {
  //     console.error("Error updating item:", error);
  //   }
  // }
  }

  return (
    <article className="post">
      <Link to={`/profile/${userProfileURL}`}>
        <img
          className="post__avatar"
          alt={`${userName}'s avatar`}
          src={userAvatar}
        />
      </Link>
      <div className="post__text">
        <div className="post__name-and-time">
          <Link to={`/profile/${userProfileURL}`}>
            <p className="post__username">{userName}</p>
          </Link>
          <p className="post__timestamp">{timestamp}</p>
        </div>
        <p className="post__content">{content}</p>

        <div className="post__reactions">
          <button className="post__btn" onClick={addLikes}>
            {isLiked ? (
              <img
                className="post__icon post__icon--likes"
                src="../../src/assets/icons/heart-solid.svg"
              />
            ) : (
              <img
                className="post__icon post__icon--likes"
                src="../../src/assets/icons/heart.svg"
              />
            )}

            <p className="post__likes">{likesCount}</p>
          </button>
          <button className="post__btn">
            <img
              className="post__icon post__icon--comments"
              src="../../src/assets/icons/comment.svg"
            />
            <p className="post__comments">{comments.length}</p>
          </button>

          {/* {loggedInUser == user_id ? (
            <div className="post__manage">
              <button className="post__btn">
                <img
                  className="post__icon post__icon--edit"
                  src="../../src/assets/icons/edit.svg"
                />
              </button>
              <button className="post__btn">
                <img
                  className="post__icon post__icon--delete"
                  src="../../src/assets/icons/trash.svg"
                />
              </button>
            </div>
          ) : (
            ""
          )} */}
        </div>
      </div>
    </article>
  );
};

export default Post;
