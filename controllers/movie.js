const Movie = require('../models/movie');

const getMovies = (req, res) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => res.send(movies))
    .catch((e) => res.status(500).send({ message: e.message }));
};

const createMovie = (req, res) => {
  const movie = req.body;
  const { _id } = req.user;
  Movie.create({ ...movie, owner: _id })
    .then((newMovie) => res.status(200).send(newMovie))
    .catch((e) => res.status(500).send({ message: e.message }));
};

const deleteMovie = (req, res) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        res.status(403).send({ message: 'Недостаточно прав' });
        return Promise.reject();
      }
      return Movie.findByIdAndRemove(movieId);
    })
    .then((movie) => res.status(200).send(movie))
    .catch((e) => res.status(500).send({ message: e.message }));
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
