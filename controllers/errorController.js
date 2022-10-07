const logger = require('../utils/logger');
const errors = require('../constants/errors');
const { ERR } = require('../constants/statuses');

/**
 * Global error handler.
 * @param {Object} err
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || ERR;

  const loggerMsg = err.isOperational
    ? `operational (${err.statusCode}) - ${err.message} \n [${err.stack}]`
    : `${err.name} - ${err.message} \n [${err.stack}]`;

  logger.error(loggerMsg);

  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  return res.status(errors.INTERNAL.code).json({
    status: ERR,
    message: errors.INTERNAL.msg
  });
};
