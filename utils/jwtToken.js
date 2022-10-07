const jwt = require('jsonwebtoken');

/**
 * Generate new JWT token
 * @param {Object} payload
 * @param {string} secret
 * @param {Object} options
 * @returns {Promise<Object>}
 */
exports.sign = (payload, secret, options) =>
  new Promise((res, rej) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) return rej(err);

      return res(token);
    });
  });

/**
 * Verify JWT token
 * @param {string} token
 * @param {string} secret
 * @param {Object} options
 * @returns {Promise<Object>}
 */
exports.verify = (token, secret, options) =>
  new Promise((res, rej) => {
    jwt.verify(token, secret, options, (err, decoded) => {
      if (err) return rej(err);

      return res(decoded);
    });
  });
