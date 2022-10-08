const catchAsync = require('../utils/catchAsync');
const errorMsg = require('../constants/errors');
const joiErrorsHandler = require('../utils/joiErrorsHandler');
const universalValidator = require('../utils/validators/universalValidator');
const movieValidator = require('../utils/validators/movieValidator');
const movieService = require('../services/movieService');
const AppError = require('../utils/appError');

/**
 * Validate movie id and movie owner.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.checkMovieIdAndOwner = catchAsync(async (req, res, next) => {
  const { value, error } = universalValidator.checkIdIsNumber(req.params);

  if (error) {
    const errToSend = joiErrorsHandler(error, { primary: errorMsg.NOT_FOUND });

    return next(errToSend);
  }

  const { userId } = await movieService.checkMovie(value.id);

  if (req.user.id !== userId) return next(new AppError(errorMsg.NOT_FOUND));

  next();
});

/**
 * Validate movie data.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.checkMovieData = (req, res, next) => {
  const { value, error } = movieValidator.checkMovieData(req.body);

  if (error) {
    const errToSend = joiErrorsHandler(error, { primary: errorMsg.INVALID_DATA });

    return next(errToSend);
  }

  req.movieData = value;

  next();
};
