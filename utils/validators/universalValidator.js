const Joi = require('joi');

const { POS_WHOLE_NUM_REGEX } = require('../../constants/regexp');

exports.checkIdIsNumber = (data) =>
  Joi.object({
    id: Joi.string().regex(POS_WHOLE_NUM_REGEX).required()
  })
    .unknown()
    .validate(data);
