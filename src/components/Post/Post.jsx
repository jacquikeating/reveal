import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase.js";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import "./Post.scss";

const Post = ({ postData, userData }) => {
  let {
    userAvatar,
    userProfileURL,
    userName,
    userUID,
    timestamp,
    content,
    likes,
    hashtags,
    comments,
    id,
  } = postData;
  comments = [];
  timestamp = new Intl.DateTimeFormat("en-US").format(timestamp);
  content = content.replace(/&#x27;/g, "'");
  const userID = userData.uid;
  // likes is an array containing the UIDs of all users who have liked the post
  const [likesCount, setLikesCount] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(likes.includes(userID));
  const postRef = doc(db, "posts", id);

  async function updateLikes() {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(likesCount - 1);
      await updateDoc(postRef, {
        likes: arrayRemove(userID),
      });
      return;
    } else {
      setIsLiked(true);
      setLikesCount(likesCount + 1);
      await updateDoc(postRef, {
        likes: arrayUnion(userID),
      });
    }
  }

  function handleDeleteClick() {
    toast(
      <div className="confirm-delete">
        <p className="confirm-delete__text">
          Are you sure you wish to delete this post?
        </p>
        <div className="confirm-delete__button-container">
          <button className="confirm-delete__button" onClick={deletePost}>
            Yes
          </button>
          <button className="confirm-delete__button" onClick={dismissToast}>
            No
          </button>
        </div>
      </div>,
      {
        theme: "dark",
      }
    );

    function dismissToast() {
      toast.dismiss();
    }

    async function deletePost() {
      console.log("Pretend the post has just been deleted.");
      dismissToast();
    }
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
          <button className="post__btn" onClick={updateLikes}>
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

          {userID == userUID ? (
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
                  onClick={handleDeleteClick}
                />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </article>
  );
};

export default Post;
