class DuplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DuplicationError';
    this.statusCode = 409;
  }
}

module.exports = DuplicationError;
