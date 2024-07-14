import React from "react";
import { Link } from "react-router-dom";
import "./Post.scss";

const Post = ({ postData, loggedInUser }) => {
  let { avatar, user_id, user_name, timestamp, content, likes, comments } =
    postData;
  comments = [];
  if (timestamp.length === 13) {
    timestamp = new Intl.DateTimeFormat("en-US").format(timestamp);
  }
  console.log(loggedInUser);
  content = content.replace(/&#x27;/g, "'");

  return (
    <article className="post">
      <Link to={`/profile/${user_id}`}>
        <img
          className="post__avatar"
          alt={`${user_name}'s avatar`}
          src={avatar}
        />
      </Link>
      <div className="post__text">
        <div className="post__name-and-time">
          <Link to={`/profile/${user_id}`}>
            <p className="post__username">{user_name}</p>
          </Link>
          <p className="post__timestamp">{timestamp}</p>
        </div>
        <p className="post__content">{content}</p>

        <div className="post__reactions">
          <button className="post__btn">
            <img
              className="post__icon post__icon--likes"
              src="../src/assets/icons/heart.svg"
            />
            <p className="post__likes">{likes}</p>
          </button>
          <button className="post__btn">
            <img
              className="post__icon post__icon--comments"
              src="../src/assets/icons/comment.svg"
            />
            <p className="post__comments">{comments.length}</p>
          </button>

          {loggedInUser == user_id ? (
            <div className="post__manage">
              <button className="post__btn">
                <img
                  className="post__icon post__icon--edit"
                  src="../src/assets/icons/edit.svg"
                />
              </button>
              <button className="post__btn">
                <img
                  className="post__icon post__icon--delete"
                  src="../src/assets/icons/trash.svg"
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
