const routes = require('express').Router();
const users = require('./users.js');
const articles = require('./articles.js');
const { createUser, login } = require('../controllers/users');
const { createUserCheck, loginCheck } = require('../modules/validate');
const { auth } = require('../middlewares/auth');

const NotFoundError = require('../errors/notFoundError');
const { NOT_FOUND } = require('../config/constants');

routes.post('/signup', createUserCheck, createUser);
routes.post('/signin', loginCheck, login);

routes.use(auth);
routes.use(users);
routes.use(articles);

routes.all('*', (req, res, next) => {
  try {
    throw new NotFoundError(NOT_FOUND);
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
