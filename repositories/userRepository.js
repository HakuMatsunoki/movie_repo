const { User } = require('../models');

/**
 * Check if user exists in the DB.
 * @param {Object} props
 * @returns {Promise<boolean>}
 */
exports.isExists = async (props) => {
  const usersCount = await User.count({ where: props });

  return !!usersCount;
};

/**
 * Create new user in the DB.
 * @param {Object} props
 * @returns {Promise<Object>}
 */
exports.create = async (props) => {
  const newUser = await User.create(props);

  return newUser?.dataValues;
};

/**
 * Get user by email.
 * @param {string} email
 * @returns {Promise<Object>}
 */
exports.findByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user?.dataValues;
};

/**
 * Get user by id.
 * @param {number} id
 * @returns {Promise<Object>}
 */
exports.findById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};
