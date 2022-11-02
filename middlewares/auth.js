const jwt = require('jsonwebtoken');
const LoginError = require('./errors/LoginError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new LoginError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    // payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new LoginError('Необходима авторизация'));
  }
  req.user = payload;
  console.log(req.user);
  next();
};
