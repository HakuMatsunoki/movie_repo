const catchAsync = require('../utils/catchAsync');
const authService = require('../services/authService');
const { OK } = require('../constants/statuses');

/**
 * New user signup.
 * @method POST
 * @param {Function} RequestHandler
 */
exports.signup = catchAsync(async (req, res) => {
  const token = await authService.createNewUser(req.userData);

  res.status(201).json({
    status: OK,
    token
  });
});

/**
 * User login.
 * @method POST
 * @param {Function} RequestHandler
 */
exports.login = catchAsync(async (req, res) => {
  const { user } = req;

  const token = await authService.signToken(user.id);

  res.status(200).json({
    status: OK,
    token
  });
});
