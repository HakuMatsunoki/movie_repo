const Joi = require('joi');

const { POS_WHOLE_NUM } = require('../../constants/regexp');

exports.checkIsNumber = (data) =>
  Joi.object({
    num: Joi.string().regex(POS_WHOLE_NUM).required()
  })
    .unknown()
    .validate(data);
