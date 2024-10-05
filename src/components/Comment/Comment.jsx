import React from "react";
import "./Comment.scss";

const Comment = ({ commentData }) => {
  return <p>{commentData.content}</p>;
};

export default Comment;
