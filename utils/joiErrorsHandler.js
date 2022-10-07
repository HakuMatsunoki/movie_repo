const AppError = require('./appError');
const errors = require('../constants/errors');
const logger = require('./logger');

/**
 * Joi errors handler function.
 * @param {Object} error
 * @param {Object} config
 */
module.exports = (error, config) => {
  const { message, path, type } = error.details[0];

  logger.error(`validator - ${message}`);

  if (type === 'object.unknown') return new AppError(errors.INVALID_DATA);
  if (!path.length) return new AppError(errors.INTERNAL);

  return config.primary ? new AppError(config.primary) : new AppError(config[path[0]]);
};
