import React, { useState } from "react";
import PostListItem from "../PostsListItem/PostListItem";
import "./PostList.css";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";
const PostList = ({ posts, editPost }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ title: "", body: "" });
  const [pageNumber, setPageNumber] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  const handlePostEdit = (post) => {
    setEditedPost(post);
    setIsEditing(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    editPost(editedPost);
    setIsEditing(false);
  };
  const handleFormClose = () => {
    setIsEditing(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "550px",
      height: "350px",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <>
      <Modal style={customStyles} isOpen={isEditing}>
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <div className="form__field">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={editedPost.title}
              onChange={(e) =>
                setEditedPost({ ...editedPost, title: e.target.value })
              }
              name="title"
            />
          </div>
          <div className="form__field">
            <label htmlFor="body">Body</label>
            <textarea
              type="text"
              value={editedPost.body}
              onChange={(e) =>
                setEditedPost({ ...editedPost, body: e.target.value })
              }
              name="body"
            />
          </div>
          <button type="submit" className="form__submit">
            Edit
          </button>
          <button
            onClick={handleFormClose}
            type="button"
            className="form__submit"
          >
            Close
          </button>
        </form>
      </Modal>
      <ul className="post-list">
        {posts.map((post, index) =>
          index < pageNumber * postsPerPage &&
          index >= postsPerPage * (pageNumber - 1) ? (
            <PostListItem
              onClick={() => handlePostEdit({ ...post })}
              key={post.id}
              {...post}
            />
          ) : null,
        )}
      </ul>
      <ReactPaginate
        containerClassName="pagination"
        pageClassName="pagination__item"
        activeClassName="pagination__item--active"
        previousClassName="pagination-previous"
        nextClassName="pagination-next"
        pageCount={posts.length / postsPerPage + 1}
        pageRangeDisplayed={5}
        marginPagesDisplayed={3}
        onPageChange={(e) => setPageNumber(e.selected)}
      />
    </>
  );
};

export default PostList;
