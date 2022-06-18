const mongoose = require('mongoose');
const { urlRegex } = require('../utils/constants');

const movie = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const isValid = urlRegex.test(v);
        if (!isValid) {
          throw new Error('Некорректная ссылка');
        }
        return true;
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const isValid = urlRegex.test(v);
        if (!isValid) {
          throw new Error('Некорректная ссылка');
        }
        return true;
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const isValid = urlRegex.test(v);
        if (!isValid) {
          throw new Error('Некорректная ссылка');
        }
        return true;
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movie);
