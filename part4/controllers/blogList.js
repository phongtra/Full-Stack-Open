const blogRouters = require('express').Router();

const Blog = require('../models/Blogs');

blogRouters.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    res.send(blogs);
  });
});

blogRouters.post('/', (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then(result => {
    res.status(201).send(result);
  });
});

module.exports = blogRouters;
