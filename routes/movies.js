const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovieFormId } = require('../controllers/movies');

const regex = /(https?:\/\/)(www\.)?\S{2,}\.\S{2,}?/;

router.get('/', getMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(regex),
      trailerLink: Joi.string().required().pattern(regex),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().pattern(regex),
      movieId: Joi.string().required(),
    }),
  }),
  createMovie,
);

router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().hex().length(24),
    }),
  }),
  deleteMovieFormId,
);

module.exports = router;
