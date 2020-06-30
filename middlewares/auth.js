const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const AuthError = require('../errors/authError');
const { AUTH_REQUIRED } = require('../config/constants');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(AUTH_REQUIRED);
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch (err) {
      throw new AuthError(AUTH_REQUIRED);
    }
    req.user = payload;
    next();
  }
};
