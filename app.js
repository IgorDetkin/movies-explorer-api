require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const serverError = require('./middlewares/errors/ServerError');
const { requestLogger, errorLogger } = require('./middlewares/Logger');
const { cors } = require('./middlewares/cors');
const routes = require('./routes/index');

const { PORT = 3000, NODE_ENV, DB_HOST } = process.env;
// DB_HOST=mongodb://localhost:27017/bifilmsdb

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  NODE_ENV === 'production' ? DB_HOST : 'mongodb://localhost:27017/bifilmsdb',
  { useNewUrlParser: true },
);

app.use(cors);

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(serverError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// ssh diplom@158.160.35.15
