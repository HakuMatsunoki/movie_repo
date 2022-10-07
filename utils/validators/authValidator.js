const Joi = require('joi');

const { EMAIL_REGEX, PASSWD_REGEX } = require('../../constants/regexp');

exports.checkNewUser = (authData) =>
  Joi.object({
    name: Joi.string().min(1).trim().required(),
    email: Joi.string().regex(EMAIL_REGEX).trim().required(),
    password: Joi.string().min(8).regex(PASSWD_REGEX).trim().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
  }).validate(authData);

exports.checkUserCreds = (authData) =>
  Joi.object({
    email: Joi.string().regex(EMAIL_REGEX).trim().required(),
    password: Joi.string().min(8).regex(PASSWD_REGEX).trim().required()
  }).validate(authData);
