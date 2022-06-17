const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/movies-explorer-db', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use('/users', auth, userRouter);
app.use('/movies', auth, movieRouter);
app.use(errors());

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
