const catchAsync = require('../utils/catchAsync');
const universalService = require('../services/universalService');
const { OK } = require('../constants/statuses');

/**
 * Create doc.
 * @param {string} model
 * @returns {Function}
 */
exports.createOne = (model) =>
  catchAsync(async (req, res) => {
    const newDoc = await universalService.createOne(model, req.data);

    res.status(201).json({
      status: OK,
      data: newDoc
    });
  });

/**
 * Get all docs.
 * @param {string} model
 * @returns {Function}
 */
exports.getAll = (model) =>
  catchAsync(async (req, res) => {
    const docs = await universalService.getAll(model, req.query); // ? query validators

    res.status(200).json({
      status: OK,
      data: docs
    });
  });

/**
 * Get doc by id.
 * @param {string} model
 * @param {string} fields
 * @returns {Function}
 */
exports.getOne = (model, fields) =>
  catchAsync(async (req, res) => {
    const doc = await universalService.getOne(model, req.docId, fields);

    res.status(200).json({
      status: OK,
      data: doc
    });
  });

/**
 * Update doc by id.
 * @param {string} model
 * @returns {Function}
 */
exports.updateOne = (model) =>
  catchAsync(async (req, res) => {
    const doc = await universalService.updateOne(model, req.data);

    res.status(201).json({
      status: OK,
      data: doc
    });
  });

/**
 * Delete doc by id.
 * @param {string} model
 * @returns {Function}
 */
exports.deleteOne = (model) =>
  catchAsync(async (req, res) => {
    await universalService.deleteOne(model, req.data.id);

    res.sendStatus(204);
  });
