const blogRouters = require('express').Router();
const jwt = require('jsonwebtoken');

const Blog = require('../models/Blogs');
const User = require('../models/User');

blogRouters.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.send(blogs);
});

blogRouters.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body;
  const token = req.token;

  if (!title && !url) {
    return res.status(400).send({ error: 'require url and title' });
  }
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id || !token) {
    return res.status(401).send({ error: 'invlaid token' });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id
  });

  await blog.save();
  user.blogs = user.blogs.concat(blog._id);
  await user.save();
  res.status(201).send(blog);
});

blogRouters.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id || !token) {
      return res.status(401).send({ error: 'invlaid token' });
    }
    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(id);
    if (user._id.toString() !== blog.user.toString()) {
      return res.status(401).send({ error: 'wrong user' });
    }
    await Blog.deleteOne({ _id: id, user: decodedToken.id });
    res.send({ message: 'deleted' });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
blogRouters.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id || !token) {
      return res.status(401).send({ error: 'invlaid token' });
    }
    const user = await User.findById(decodedToken.id);
    const blogCompare = await Blog.findById(id);
    if (user._id.toString() !== blogCompare.user.toString()) {
      return res.status(401).send({ error: 'wrong user' });
    }
    await Blog.updateOne(
      { _id: id, user: decodedToken.id },
      { likes: req.body.likes }
    );
    const blog = await Blog.findById(id);
    res.send(blog);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
blogRouters.post('/:id/comments', async (req, res) => {
  const id = req.params.id;
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id || !token) {
    return res.status(401).send({ error: 'invlaid token' });
  }
  if (!req.body.comment) {
    return res.status(400).send({ error: 'must provide comment' });
  }
  await Blog.findByIdAndUpdate(id, { $push: { comments: req.body.comment } });
  const blog = await Blog.findById(id);
  res.send(blog);
});
module.exports = blogRouters;
