const bcrypt = require('bcryptjs');

const jwtToken = require('../utils/jwtToken');
const AppError = require('../utils/appError');
const logger = require('../utils/logger');
const errorMsg = require('../constants/errors');
const userRepository = require('../repositories/userRepository');
// const universalRepository = require('../universalRepository');

/**
 * Generate new JWT token.
 * @param {string} id
 * @returns {Promise<string>}
 */
const signToken = async (id) => {
  try {
    const token = await jwtToken.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    return token;
  } catch (err) {
    logger.error(`JsonWebTokenError - ${err.message}`);

    throw new AppError(errorMsg.INTERNAL);
  }
};
exports.signToken = signToken;

/**
 * Verify JWT token.
 * @param {string} token
 * @returns {Promise<string>}
 */
const verifyToken = async (token) => {
  try {
    const decoded = await jwtToken.verify(token, process.env.JWT_SECRET);

    return decoded;
  } catch (err) {
    logger.error(`JsonWebTokenError - ${err.message}`);

    throw new AppError(errorMsg.NO_LOGIN);
  }
};
exports.verifyToken = verifyToken;

/**
 * Check if user exists.
 * @param {string} email
 * @returns {Promise<boolean>}
 */
exports.checkUserByEmail = async (email) => {
  const userExists = await userRepository.isExists({ email });

  return userExists;
};

/**
 * Create new user in the DB.
 * @param {Object} userData
 * @returns {Promise<Object>}
 */
exports.createNewUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 12);

  const newUser = await userRepository.create({
    name: userData.name,
    email: userData.email,
    password: hashedPassword
  });

  const token = await signToken(newUser.id);

  return token;
};

/**
 * Find user by email and check if password is correct.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>}
 */
exports.checkUserLogin = async (email, password) => {
  const user = await userRepository.findByEmail(email);

  if (!user) throw new AppError(errorMsg.FAILED_AUTH);

  const isCorrect = await bcrypt.compare(password, user.password);

  if (!isCorrect) throw new AppError(errorMsg.FAILED_AUTH);

  return user;
};

/**
 * Find user by id.
 * @param {number} id
 * @returns {Promise<Object>}
 */
exports.getUserById = async (id) => {
  const user = await userRepository.findById(id);

  return user;
};
