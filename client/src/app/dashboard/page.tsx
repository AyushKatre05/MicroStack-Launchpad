"use client";
import { useEffect, useState } from "react";

type Post = {
  _id: string;
  title: string;
  content?: string;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/token")
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          setToken(data.token);
          fetchPosts(data.token);
        } else {
          setError("Unable to fetch token");
        }
      })
      .catch(() => setError("Failed to get token"));
  }, []);

  const fetchPosts = (authToken?: string) => {
    if (!authToken) {
      setError("No token available");
      return;
    }
    fetch("http://localhost:5000/api/posts", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          setPosts([]);
          setError("Unexpected response format");
        }
      })
      .catch(() => setError("Failed to fetch posts"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!token) {
      setError("No token available");
      setLoading(false);
      return;
    }
    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setTitle("");
      setContent("");
      fetchPosts(token);
    } else {
      setError(data.error || "Failed to create post");
    }
  };

  return (
    <div>
      <h1>Your Posts</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
      {error && <p>{error}</p>}
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <strong>{post.title}</strong>
            {post.content && <div>{post.content}</div>}
          </li>
        ))}
      </ul>
      {token && <p>Token: {token}</p>}
    </div>
  );
}
