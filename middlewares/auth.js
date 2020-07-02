const jwt = require('jsonwebtoken');

const { JWT_KEY } = require('../config/devconfig');

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
      payload = jwt.verify(token, JWT_KEY);
    } catch (err) {
      throw new AuthError(AUTH_REQUIRED);
    }
    req.user = payload;
    next();
  }
};
