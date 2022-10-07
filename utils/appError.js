const { FAIL, ERR } = require('../constants/statuses');

/** Class extends built-in Error */
class AppError extends Error {
  /**
   * Create AppError instance.
   * @param {Object}
   */
  constructor({ code, msg }) {
    super(msg);

    this.statusCode = code;
    this.status = `${code}`.startsWith('4') ? FAIL : ERR;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
