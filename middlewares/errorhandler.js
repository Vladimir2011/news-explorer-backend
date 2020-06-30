const { SERVER_ERROR } = require('../config/constants');

/* eslint-disable no-unused-vars */
module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? SERVER_ERROR
        : message,
    });
};
