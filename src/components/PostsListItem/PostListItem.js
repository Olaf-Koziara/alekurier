import React from "react";
import "./PostListItem.css";
const PostListItem = ({ id, title, body, onClick }) => {
  return (
    <li onClick={onClick} className="post-list__item">
      <h3>{title}</h3>
      <p>{body}</p>
    </li>
  );
};

export default PostListItem;
