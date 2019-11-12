import React from 'react';

import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

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
  createBlog,
  blogFormRef,
  updateBlog,
  deleteBlog
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
      <Togglable buttonLabel="new note" ref={blogFormRef}>
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
      </Togglable>

      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => {
            return (
              <div key={blog.id}>
                <Blog
                  blog={blog}
                  updateBlog={updateBlog}
                  deleteBlog={deleteBlog}
                  user={user}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Blogs;
