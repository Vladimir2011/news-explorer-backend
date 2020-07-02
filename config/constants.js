const SERVER_ERROR = 'На сервере произошла ошибка';
const NOT_FOUND = 'Запрашиваемый ресурс не найден';
const ARTICLE_NOT_FOUND = 'Статей с таким id не существует';
const DELETE_FORBIDDEN = 'Невозможно удалить чужую сохраненную статью';
const CONFLICT_USER = 'Пользователь с таким почтовым ящиком уже был зарегистрирован';
const AUTH_REQUIRED = 'Необходима авторизация';
const WRONG_AUTH = 'Неправильные почта или пароль';
const WRONG_URL = 'Неверный формат ссылки!';

module.exports = {
  SERVER_ERROR,
  NOT_FOUND,
  ARTICLE_NOT_FOUND,
  DELETE_FORBIDDEN,
  CONFLICT_USER,
  AUTH_REQUIRED,
  WRONG_AUTH,
  WRONG_URL,
};
