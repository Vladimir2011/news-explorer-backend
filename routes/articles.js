const articleRouter = require('express').Router();

const { getSavedArticles, createArticle, deleteArticle } = require('../controllers/articles.js');

const { checkArticle, checkArticleId } = require('../modules/validate');

articleRouter.get('/articles', getSavedArticles);

articleRouter.post('/articles', checkArticle, createArticle);

articleRouter.delete('/articles/:articleId', checkArticleId, deleteArticle);

module.exports = articleRouter;
