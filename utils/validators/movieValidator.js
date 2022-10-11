const Joi = require('joi');

const { FORMATS } = require('../../constants/enums');
const { NAME_REGEX } = require('../../constants/regexp');

exports.checkMovieData = (authData) =>
  Joi.object({
    title: Joi.string().min(1).trim().required(),
    year: Joi.number().min(1900).max(2099).required(),
    format: Joi.string()
      .valid(...Object.values(FORMATS))
      .required(),
    actors: Joi.array().items(Joi.string().min(2).max(40).regex(NAME_REGEX).default([]))
  }).validate(authData);
