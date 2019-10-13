const _ = require('lodash');

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0;
  }
  const sum = blogs.reduce((sum, item) => {
    return sum + item.likes;
  }, 0);
  return sum;
};

const favoriteBlogs = blogs => {
  let max = 0;
  blogs.forEach(blog => {
    if (blog.likes > max) {
      max = blog.likes;
    }
  });
  const favorite = blogs.find(blog => max === blog.likes);
  return favorite;
};
const mostBlogs = blogs => {
  let max = 0;
  const authorsBlogs = Object.entries(
    _.countBy(blogs, blog => {
      return blog.author;
    })
  );
  let result = {};
  for (const [author, blogs] of authorsBlogs) {
    if (blogs > max) {
      max = blogs;
    }
    if (max === blogs) {
      result = { author, blogs: max };
    }
  }
  return result;
};
const mostLikes = blogs => {
  let max = 0;
  let result = {};

  for (let i = 0; i < blogs.length; i++) {
    let sum = blogs[i].likes;
    for (let j = i + 1; j < blogs.length; j++) {
      if (blogs[i].author === blogs[j].author) {
        sum += blogs[j].likes;
      }
      if (sum > max) {
        max = sum;
        result = { author: blogs[i].author, likes: max };
      }
    }
  }
  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes
};
