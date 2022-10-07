const models = require('../models');
const APIFeatures = require('../utils/apiFeatures');

/**
 * Check if document exists.
 * @param {string} model
 * @param {Object} data
 * @returns {Promise<boolean>}
 */
exports.checkDocumentExists = async (model, data) => {
  const exists = await models[model].exists(data);

  return !!exists;
};

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
 * @param {string} query
 * @returns {Promise<Object>}
 */
exports.getOne = (model, id, query) => models[model].findByPk(id, query);

/**
 * Update document by id.
 * @param {string} model
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
exports.updateOne = (model, { id, ...data }) =>
  models[model]
    .findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    })
    .lean();

/**
 * Delete document by id.
 * @param {string} model
 * @param {string} id
 * @param {string} fields
 */
exports.deleteOne = (model, id, fields = '_id') => models[model].findByIdAndDelete(id).select(fields).lean();
