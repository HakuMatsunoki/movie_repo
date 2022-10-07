const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const authService = require('../services/authService');
const authValidator = require('../utils/validators/authValidator');
const nameNormalizer = require('../utils/userNameHandler');
const errors = require('../constants/errors');
const joiErrorsHandler = require('../utils/joiErrorsHandler');

/**
 * Validate new user data and check if user already exist.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.checkNewUser = catchAsync(async (req, res, next) => {
  const { value, error } = authValidator.checkNewUser(req.body);

  if (error) {
    const errToSend = joiErrorsHandler(error, {
      name: errors.FAILED_USER_NAME,
      email: errors.FAILED_USER_EMAIL,
      password: errors.FAILED_USER_PASSWD,
      confirmPassword: errors.FAILED_USER_PASSWD_DIFF
    });

    return next(errToSend);
  }

  const userExists = await authService.checkUserByEmail(value.email);

  if (userExists) return next(new AppError(errors.FAILED_USER_EXISTS));

  req.userData = {
    name: nameNormalizer(value.name),
    email: value.email,
    password: value.password
  };

  next();
});

/**
 * Validate user login data and check credentials.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.checkUserCreds = catchAsync(async (req, res, next) => {
  const { value, error } = authValidator.checkUserCreds(req.body);

  if (error) {
    const errToSend = joiErrorsHandler(error, { primary: errors.FAILED_AUTH });

    return next(errToSend);
  }

  req.user = await authService.checkUserLogin(value.email, value.password);

  next();
});

/**
 * Check if user logged in.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.startsWith('Bearer')
      ? req.headers.authorization.split(' ')[1]
      : false;

  if (!token) return next(new AppError(errors.NO_LOGIN));

  const { id } = await authService.verifyToken(token);
  const currentUser = await authService.getUserById(id);

  if (!currentUser) return next(new AppError(errors.NO_LOGIN));

  req.user = currentUser;

  next();
});
