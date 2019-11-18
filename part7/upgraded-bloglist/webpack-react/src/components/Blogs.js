import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = ({ blogFormRef, logoutUser, user, blogs }) => {
  if (!user) {
    return;
  }
  return (
    <div className="blogs-page">
      <h2>Blogs</h2>
      <div>{user.userCredential.username} has logged in</div>
      <button
        onClick={() => {
          logoutUser();
        }}
      >
        logout
      </button>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <h2>create</h2>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>

      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => {
            return (
              <div key={blog.id}>
                <Blog blog={blog} user={user} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { blogs: state.blogs, user: state.user };
};

export default connect(mapStateToProps, actions)(Blogs);
