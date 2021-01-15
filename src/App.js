import "./App.css";
import { useEffect, useState } from "react";
import PostList from "./components/PostsList/PostList";

function App() {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);
  const [posts, setPosts] = useState([]);
  const handlePostFormSubmit = (editedPost) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${editedPost.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...editedPost }),
    });

    setPosts(
      posts.map((post) => (post.id === editedPost.id ? editedPost : post)),
    );
  };
  return (
    <div className="App">
      <PostList editPost={handlePostFormSubmit} posts={posts} />
    </div>
  );
}

export default App;
