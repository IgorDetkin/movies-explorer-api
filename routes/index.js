const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../middlewares/errors/NotFoundError');


const regexName = /[a-zA-Z0-9А-Яа-яЁё._:$!%@\s-]+/;
const regexEmail = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.+(\w{2,})$/;
const regexPassword = /[a-zA-Z0-9._\W\s-]+/;


router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).pattern(regexName),
      email: Joi.string().required().email().pattern(regexEmail),
      password: Joi.string().required().pattern(regexPassword),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email().pattern(regexEmail),
      password: Joi.string().required().pattern(regexPassword),
    }),
  }),
  login,
);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
