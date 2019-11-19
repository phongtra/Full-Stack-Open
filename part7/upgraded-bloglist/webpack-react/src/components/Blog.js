import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions';

const Blog = ({ blog, deleteCurrentBlog, user }) => {
  const deleteBlog = (id, blog) => {
    deleteCurrentBlog(id, blog);
  };

  const renderRemoveButton = () => {
    if (blog.user && user.userCredential.id) {
      return (
        <div>
          {blog.user.id === user.userCredential.id ? (
            <button
              className="ui button basic red"
              onClick={() => deleteBlog(blog.id, blog)}
            >
              remove
            </button>
          ) : (
            <div>No remove button</div>
          )}
        </div>
      );
    }
  };
  if (!blog && user) {
    return <div>...Loading</div>;
  }
  return (
    <>
      <div className="ui fluid card">
        <div className="content">
          <Link to={`/users/${user.userCredential.id}`} className="header">
            {blog.author}
          </Link>
          <Link className="description" to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
        <div className="extra content">{renderRemoveButton()}</div>
      </div>
    </>
  );
};

export default connect(null, actions)(Blog);
