import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = ({ blogFormRef, user, blogs }) => {
  if (!user) {
    return;
  }
  return (
    <div className="blogs-page">
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>

      <div className="ui three column grid">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => {
            return (
              <div className="column" key={blog.id}>
                <Blog blog={blog} user={user} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { blogs: state.blogs, user: state.user.currentUser };
};

export default connect(mapStateToProps, actions)(Blogs);
