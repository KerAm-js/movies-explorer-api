const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const userController = require('../controllers/user');

router.get('/users/me', userController.getUserInfo);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), userController.updateUserInfo);

module.exports = router;
