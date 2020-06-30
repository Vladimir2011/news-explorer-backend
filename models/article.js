const mongoose = require('mongoose');
const validate = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validate.isURL(link),
      message: (props) => `${props.value} неверный формат ссылки!`,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validate.isURL(link),
      message: (props) => `${props.value} неверный формат ссылки!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    select: false,
    required: true,
  },
});

module.exports = mongoose.model('article', articleSchema);
