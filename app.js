const express = require('express');
const mongoose = require('mongoose');
const { Joi, errors, celebrate } = require('celebrate');
const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');
const userController = require('./controllers/user');
const auth = require('./middlewares/auth');
const errorHandling = require('./middlewares/errorHandling');
const pageNotFound = require('./middlewares/pageNotFound');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/movies-explorer-db', {
  useNewUrlParser: true,
});

app.use(express.json());
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
}), userController.createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), userController.login);
app.use('/users', auth, userRouter);
app.use('/movies', auth, movieRouter);
app.use('/', auth, pageNotFound);
app.use(errors());
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
