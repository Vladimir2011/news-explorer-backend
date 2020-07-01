require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { limiter } = require('./modules/limiter');
const { DATABASE_URL } = require('./config/devconfig');

const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;

const { errorHandler } = require('./middlewares/errorhandler');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);

// подключаемся к серверу mongo
mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Работаем, без проблем');
});
