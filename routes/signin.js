const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const userController = require('../controllers/user');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), userController.login);

module.exports = router;
