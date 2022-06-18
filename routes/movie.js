const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const movieController = require('../controllers/movie');
const { urlRegex } = require('../utils/constants');

router.get('/', movieController.getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(new RegExp(urlRegex)),
    trailerLink: Joi.string().required().pattern(new RegExp(urlRegex)),
    thumbnail: Joi.string().required().pattern(new RegExp(urlRegex)),
    movieId: Joi.string().length(24).hex(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), movieController.createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), movieController.deleteMovie);

module.exports = router;
