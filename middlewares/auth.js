const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).send({ message: 'Ошибка авторизации' });
  }

  let token;
  let payload;

  try {
    token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = {
      _id: payload,
    };
  } catch (e) {
    return;
  }
  // req.user = {
  //   _id: '62ace0621b91115ea65ec51e',
  // };
  next();
};

module.exports = auth;
