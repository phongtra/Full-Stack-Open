import React, { useState } from 'react';

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [expand, setExpand] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  const hideWhenExpand = { display: expand ? 'none' : '' };
  const showWhenExpand = { display: expand ? '' : 'none' };
  const toggleExpand = () => {
    setExpand(!expand);
  };
  const update = (updatedBlog, id) => {
    updateBlog(updatedBlog, id);
  };
  const blogDel = () => {
    deleteBlog(blog.id, blog);
  };
  const renderRemoveButton = () => {
    if (blog.user && user.userCredential.id) {
      return (
        <div>
          {blog.user.id === user.userCredential.id ? (
            <button onClick={blogDel}>remove</button>
          ) : (
            ''
          )}
        </div>
      );
    }
  };
  return (
    <div className="blog-detail" style={blogStyle} onClick={toggleExpand}>
      <div style={hideWhenExpand}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenExpand}>
        <div>{blog.title}</div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes{' '}
          <button
            className="like"
            onClick={() =>
              update(
                {
                  title: blog.title,
                  author: blog.author,
                  url: blog.url,
                  likes: blog.likes + 1
                },
                blog.id
              )
            }
          >
            like
          </button>
        </div>
        <div>added by {blog.author}</div>
        {renderRemoveButton()}
      </div>
    </div>
  );
};

export default Blog;
