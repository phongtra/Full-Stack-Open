import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { useField } from '../hooks';

const BlogInfo = ({ blog, updateCurrentBlog, addNewComment }) => {
  const [comment, commentReset] = useField('text');
  if (!blog) {
    return <div>...Loading</div>;
  }
  const updateBlog = async (updateBlog, id) => {
    updateCurrentBlog(updateBlog, id);
  };
  const addComment = (comment, id) => {
    addNewComment(comment, id);
    commentReset();
  };
  console.log(blog);
  return (
    <div className="ui centered card">
      <div className="content">
        <h2 style={{ textAlign: 'center' }} className="ui header blue">
          {blog.title}
        </h2>
        <div className="meta">{blog.url}</div>
        <div className="description">added by {blog.author}</div>
        <span className="right floated">
          <i
            onClick={() =>
              updateBlog(
                {
                  title: blog.title,
                  author: blog.author,
                  ur: blog.url,
                  likes: ++blog.likes
                },
                blog.id
              )
            }
            className="heart outline like icon"
          ></i>
          {blog.likes} likes{' '}
        </span>
        <i className="comment icon"></i>
        {blog.comments.length}
      </div>
      <div className="extra content">
        <div className="ui large transparent left icon input">
          <i className="heart outline icon"></i>
          <input {...comment} placeholder="Add Comment..." />
          <span className="right floated">
            <i
              onClick={() => {
                addComment({ comment: comment.value }, blog.id);
              }}
              className="comment icon"
            ></i>
          </span>
        </div>
      </div>
      <div className="extra content">
        {blog.comments.length > 0 ? (
          <div className="ui relaxed divided list">
            {blog.comments.map((comment, index) => (
              <div className="item" key={index}>
                {comment}
              </div>
            ))}
          </div>
        ) : (
          <p>no comments</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ blogs }, ownProps) => {
  return {
    blog: blogs.find(blog => blog.id === ownProps.match.params.id)
  };
};

export default connect(mapStateToProps, actions)(BlogInfo);
