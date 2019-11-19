import React from 'react';
import { connect } from 'react-redux';
import { useField } from '../hooks';

import * as actions from '../actions';

const BlogForm = ({ createNewBlog, blogFormRef }) => {
  const [title, titleReset] = useField('text');
  const [author, authorReset] = useField('text');
  const [url, urlReset] = useField('text');
  const createBlog = async event => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    createNewBlog({
      title: title.value,
      author: author.value,
      url: url.value
    });
    titleReset();
    authorReset();
    urlReset();
  };
  return (
    <div>
      <form className="ui form" onSubmit={createBlog}>
        <h2 className="ui dividing header">create</h2>
        <div className="two fields">
          <div className="field">
            <label>title</label>
            <input {...title} name="Title" />
          </div>
          <div className="field">
            <label>author</label>
            <input {...author} name="Author" />
          </div>
        </div>
        <div className="field">
          url
          <input {...url} name="URL" />
        </div>
        <button className="ui blue button" type="submit">
          submit
        </button>
      </form>
      <br />
    </div>
  );
};

export default connect(null, actions)(BlogForm);
