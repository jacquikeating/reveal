import React from "react";
import "./Post.scss";

const Post = ({ postData }) => {
  let { avatar, user_id, timestamp, content, likes, comments } = postData;
  if (!comments) {
    comments = [];
  }
  console.log(postData);

  return (
    <article className="post">
      <img className="post__avatar" alt={`${user_id}'s avatar`} src={avatar} />
      <div className="post__text">
        <div className="post__name-and-time">
          <p className="post__username">{user_id}</p>
          <p className="post__timestamp">{timestamp}</p>
        </div>
        <p className="post__content">{content}</p>
        <div className="post__reactions">
          <img
            className="post__icon post__icon--likes"
            src="../src/assets/icons/heart.svg"
          />
          <p className="post__likes">{likes}</p>
          <img
            className="post__icon post__icon--comments"
            src="../src/assets/icons/comment.svg"
          />
          <p className="post__comments">{comments.length}</p>
        </div>
      </div>
    </article>
  );
};

export default Post;
