import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase.js";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import NewPostForm from "../NewPostForm/NewPostForm.jsx";
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
  const [postDisplay, setPostDisplay] = useState("flex");
  const [editMode, setEditMode] = useState(false);
  const [bodyText, setBodyText] = useState(content);
  const [writeComment, setWriteComment] = useState(false);
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
      await deleteDoc(postRef);
      setPostDisplay("none");
      dismissToast();
    }
  }

  async function updatePostContent() {
    await updateDoc(postRef, {
      content: bodyText,
    });
    setEditMode(false);
  }

  return (
    <article className="post" style={{ display: `${postDisplay}` }}>
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

        {!editMode ? (
          <p className="post__content">{bodyText}</p>
        ) : (
          <textarea
            className="post__edit-body-textarea"
            defaultValue={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
          />
        )}

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
          <button className="post__btn" onClick={() => setWriteComment(true)}>
            <img
              className="post__icon post__icon--comments"
              src="../../src/assets/icons/comment.svg"
            />
            <p className="post__comments">{comments.length}</p>
          </button>

          {userID == userUID ? (
            <div className="post__manage">
              {!editMode ? (
                <button className="post__btn" onClick={() => setEditMode(true)}>
                  <img
                    className="post__icon post__icon--edit"
                    src="../../src/assets/icons/edit.svg"
                  />
                </button>
              ) : (
                <button className="post__btn" onClick={updatePostContent}>
                  <img
                    className="post__icon post__icon--check"
                    src="../../src/assets/icons/check.svg"
                  />
                </button>
              )}

              <button className="post__btn" onClick={handleDeleteClick}>
                <img
                  className="post__icon post__icon--delete"
                  src="../../src/assets/icons/trash.svg"
                />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        {writeComment ? <NewPostForm /> : ""}
      </div>
    </article>
  );
};

export default Post;
