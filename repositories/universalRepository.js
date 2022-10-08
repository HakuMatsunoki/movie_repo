const models = require('../models');
// const APIFeatures = require('../utils/apiFeatures');

/**
 * Create document.
 * @param {string} model
 * @param {Object} data
 * @returns {Promise<Object>}
 */
exports.createOne = (model, data) => models[model].create(data);

/**
 * Get all documents.
 * @param {string} model
 * @param {Object} query
 * @returns {Promise<Array>}
 */
exports.getAll = (model, query) => models[model].findAll(query);

/**
 * Get document by id.
 * @param {string} model
 * @param {strimg} id
 * @param {Object} query
 * @returns {Promise<Object>}
 */
exports.getOne = (model, id, query) => models[model].findByPk(id, query);

/**
 * Update document by id.
 * @param {string} model
 * @param {number} id
 * @param {Object} data
 * @returns {Promise<Object>}
 */
exports.updateOne = (model, id, data) => models[model].update({ ...data }, { where: { id } });

/**
 * Delete document by id.
 * @param {string} model
 * @param {Object} query
 */
exports.deleteOne = (model, query) => models[model].destroy(query);

/**
 * Delete many documents.
 * @param {string} model
 * @param {Object} query
 */
exports.deleteMany = (model, query) => models[model].destroy(query);

/**
 * Count documents.
 * @param {string} model
 * @param {Object} query
 * @returns {Promise<number>}
 */
exports.count = (model, query) => models[model].count(query);
