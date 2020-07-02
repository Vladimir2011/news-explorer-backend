const mongoose = require('mongoose');
const validate = require('validator');
const bcrypt = require('bcryptjs');

const AuthError = require('../errors/authError');
const { WRONG_AUTH } = require('../config/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validate.isEmail(email),
      message: (props) => `${props.value} неверный формат почты!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw Promise.reject(new AuthError(WRONG_AUTH));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw Promise.reject(new AuthError(WRONG_AUTH));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
