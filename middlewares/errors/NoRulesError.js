class NoRulesError extends Error {
  constructor(message) {
    super(message);
    // this.name = 'ValidationError';
    this.statusCode = 403;
  }
}

module.exports = NoRulesError;
