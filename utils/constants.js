const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const urlRegex = /(https?:\/\/)(www\.)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\da-z\-._~:/?#[\]@!$&'()*+,;=])*#?/;
const messages = {
  SUCCESS_AUTH: 'Вы успшено авторизировались',
  UNAUTHORIZED: 'Ошибка авторизации',
  USER_EMAIL_CONFLICT: 'Пользователь с таким email уже существует',
  FORBIDDEN: 'Недостаточно прав',
  UNVALID_MOVIE_DATA: 'Некорректные данные фильма',
  MOVIE_NOT_FOUND: 'Фильм не найден',
  UNVALID_USER_DATA: 'Некорректные данные пользователя',
  USER_NOT_FOUND: 'Пользователь не найден',
  WRONG_USER_DATA: 'Неправильные данные пользователя',
};

module.exports = {
  emailRegex,
  urlRegex,
  messages,
};
