class MissingError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MissingError';
    this.statusCode = 404;
  }
}

module.exports = MissingError;
