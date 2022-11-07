class MongoServerError extends Error {
  constructor(message) {
    super(message);
    // this.name = 'ValidationError';
    this.statusCode = 409;
  }
}

module.exports = MongoServerError;
