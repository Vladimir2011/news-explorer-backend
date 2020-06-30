const validator = require('validator');
const { WRONG_URL } = require('../config/constants');

const validatorURL = (link) => {
  if (!validator.isURL(link)) {
    throw new Error(WRONG_URL);
  }
  return link;
};
module.exports = { validatorURL };
