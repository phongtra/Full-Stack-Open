import React from 'react';

const BlogForm = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  createBlog
}) => {
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

export default BlogForm;
