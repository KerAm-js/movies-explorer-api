const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Movie = require('../models/movie');

const getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => res.send(movies))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные карточки'));
        return;
      }
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const movie = req.body;
  const { _id } = req.user;
  Movie.create({ ...movie, owner: _id })
    .then((newMovie) => res.status(200).send(newMovie))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные карточки'));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return Promise.reject(new NotFoundError('Фильм не найден'));
      }
      if (movie.owner.toString() !== req.user._id) {
        return Promise.reject(new ForbiddenError('Недостаточно прав'));
      }
      return Movie.findByIdAndRemove(movieId);
    })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные карточки'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
