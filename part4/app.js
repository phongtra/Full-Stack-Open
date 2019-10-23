const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const configs = require('./utils/configs');
const blogRouters = require('./controllers/blogList');
const usersRouter = require('./controllers/user');

const getTokenFrom = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    req.token = authorization.substring(7);
  }
  next();
};

const mongoUrl = configs.MONGO_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.json());
app.use(getTokenFrom);

app.use('/api/blogs', blogRouters);
app.use('/api/users', usersRouter);

module.exports = app;
