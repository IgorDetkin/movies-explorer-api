class LoginError extends Error {
  constructor(message) {
    super(message);
    // this.name = 'ValidationError';
    this.statusCode = 401;
  }
}

module.exports = LoginError;
