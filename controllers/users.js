const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.js');
const ConflictError = require('../errors/conflictError.js');
const { CONFLICT_USER } = require('../config/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

// Получаем информацию о себе
module.exports.getUserInfo = (req, res, next) => {
  userModel.findById({ _id: req.user._id })
    .then((user) => {
      res.status(200).send({ email: user.email, name: user.name });
    })
    .catch(next);
};

// Регистрация пользователя
module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  userModel.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        throw new ConflictError(CONFLICT_USER);
      }
      bcrypt.hash(password, 10)
        .then((hash) => userModel.create({ email, password: hash, name }))
        .then((createdUser) => {
          res.status(201).send({
            _id: createdUser._id, email: createdUser.email, name: createdUser.name,
          });
        });
    })
    .catch(next);
};

// Авторизация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(201).cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ token });
    })
    .catch(next);
};
