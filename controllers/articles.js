const articleModel = require('../models/article.js');
const NotFoundError = require('../errors/notFoundError');
const ForbidError = require('../errors/forbidError');
const { ARTICLE_NOT_FOUND, DELETE_FORBIDDEN } = require('../config/constants');

//  Получаем все статьи пользователя
module.exports.getSavedArticles = (req, res, next) => {
  articleModel.find({ owner: req.user._id })
    .then((articles) => res.status(200).send({ data: articles }))
    .catch(next);
};

// Создание статьи
module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  articleModel.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

// Удаление статьи пользователем
module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  articleModel.findById(articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(ARTICLE_NOT_FOUND);
      } else if (!article.owner.equals(req.user._id)) {
        throw new ForbidError(DELETE_FORBIDDEN);
      } else {
        articleModel.findByIdAndRemove(articleId)
          .then(() => res.status(200).send({ data: article }))
          .catch(next);
      }
    })
    .catch(next);
};
