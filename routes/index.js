const router = require('express').Router();
const userRouter = require('./user');
const movieRouter = require('./movie');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const pageNotFoundRouter = require('./pageNotFound');
const auth = require('../middlewares/auth');

router.use(signupRouter);
router.use(signinRouter);
router.use(auth);
router.use(userRouter);
router.use(movieRouter);
router.use(pageNotFoundRouter);

module.exports = router;
