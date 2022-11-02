class NotFoundError extends Error {
  constructor(message) {
    super(message);
    // this.name = 'ValidationError';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
