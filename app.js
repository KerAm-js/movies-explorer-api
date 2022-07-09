const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const errorHandling = require('./middlewares/errorHandling');
const limiter = require('./limiter.config');

const app = express();
const { PORT = 3000, DATA_BASE = 'mongodb://localhost:27017/movies-explorer-db' } = process.env;
mongoose.connect(DATA_BASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
<<<<<<< HEAD
  useCreateIndex: true,
=======
>>>>>>> bc842be71f0e178e01449cd1e0ce8b551567c1ef
  autoIndex: true,
});

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
