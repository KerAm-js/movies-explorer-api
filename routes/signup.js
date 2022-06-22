const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const userController = require('../controllers/user');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
}), userController.createUser);

module.exports = router;
