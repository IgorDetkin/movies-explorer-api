const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUserInfo, updateProfile } = require('../controllers/users');
const regexName = /[a-zA-Z0-9А-Яа-яЁё._:$!%@\s-]+/;
const regexEmail = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.+(\w{2,})$/;

router.get('/me', getUserInfo);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).pattern(regexName),
      email: Joi.string().required().email().pattern(regexEmail),
    }),
  }),
  updateProfile,
);

module.exports = router;
