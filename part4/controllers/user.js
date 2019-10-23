const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

usersRouter.post('/signup', async (req, res, next) => {
  try {
    const { username, name, password } = req.body;
    if (!username || !password) {
      return res
        .status(404)
        .send({ error: 'must provide both username and password' });
    }
    if (username.length < 3 || password.length < 3) {
      return res.status(404).send({
        error: 'username and password must be at least 3 characters long'
      });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(401).send({ error: 'username must be unique' });
    }
    const saltRound = 10;
    const passwordHash = await bcrypt.hash(password, saltRound);

    const user = new User({
      username,
      name,
      passwordHash
    });
    await user.save();
    res.send(user.toJSON());
  } catch (e) {
    next(e);
  }
});
usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1
  });
  res.send(users);
});

usersRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).send({ error: 'invalid username and password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.send({ token });
});
module.exports = usersRouter;
