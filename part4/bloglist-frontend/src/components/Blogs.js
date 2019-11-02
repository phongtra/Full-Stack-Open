import React from 'react';

import Blog from './Blog';
import BlogForm from './BlogForm';

const Blogs = ({
  blogs,
  user,
  setUser,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  createBlog
}) => {
  return (
    <div>
      <h2>Blogs</h2>
      <div>{user.userCredential.username} has logged in</div>
      <button
        onClick={() => {
          window.localStorage.clear();
          setUser(null);
        }}
      >
        logout
      </button>
      <h2>create</h2>
      <BlogForm
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        createBlog={createBlog}
      />
      <ul>
        {blogs.map(blog => {
          return (
            <li key={blog.id}>
              <Blog blog={blog} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Blogs;
