const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const configs = require('./utils/configs');
const blogRouters = require('./controllers/blogList');

const mongoUrl = configs.MONGO_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.json());

app.use('/api/blogs', blogRouters);

module.exports = app;
