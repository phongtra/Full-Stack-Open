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
    <>
      <form onSubmit={createBlog}>
        <div>
          title
          <input {...title} name="Title" />
        </div>
        <div>
          author
          <input {...author} name="Author" />
        </div>
        <div>
          url
          <input {...url} name="URL" />
        </div>
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default connect(null, actions)(BlogForm);
