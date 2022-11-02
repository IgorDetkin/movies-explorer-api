const Movie = require('../models/movie');

const ValidationError = require('../middlewares/errors/ValidationError');
const NotFoundError = require('../middlewares/errors/NotFoundError');
const NoRulesError = require('../middlewares/errors/NoRulesError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image,
    trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании карточки'));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovieFormId = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (String(movie.owner) !== req.user._id) {
        throw new NoRulesError('Вы не можете удалить чужую карточку');
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.send({ data: movie }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};
