const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const User = require('../models/user');
const { messages } = require('../utils/constants');

dotenv.config();

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const { email, name } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({ email, name, password: hash }))
    .then((result) => {
      const { password, ...userData } = result.toObject();
      res.status(201).send({ ...userData });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.UNVALID_USER_DATA));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError(messages.USER_EMAIL_CONFLICT));
        return;
      }
      next(err);
    });
};

const getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { _id } = req.user;
  const { email, name } = req.body;
  User.findByIdAndUpdate(_id, { email, name }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      next(new BadRequestError(messages.UNVALID_USER_DATA));
      return;
    }
    if (err.code === 11000) {
      next(new ConflictError(messages.USER_EMAIL_CONFLICT));
      return;
    }
    next(err);
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(messages.USER_NOT_FOUND));
      }
      return bcrypt.compare(password, user.password)
        .then((result) => {
          if (!result) {
            return Promise.reject(new UnauthorizedError(messages.UNVALID_USER_DATA));
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: 3600 * 24 * 7 });
      res.status(200).send({ message: messages.SUCCESS_AUTH, token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.UNVALID_USER_DATA));
        return;
      }
      next(err);
    });
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
  login,
};
