const Joi = require('joi');

const { FORMATS } = require('../../constants/enums');

exports.checkMovieData = (authData) =>
  Joi.object({
    title: Joi.string().min(1).trim().required(),
    year: Joi.number().min(1900).max(2099).required(),
    format: Joi.string()
      .valid(...Object.values(FORMATS))
      .required(),
    actors: Joi.array().items(Joi.string().default([]))
  }).validate(authData);
