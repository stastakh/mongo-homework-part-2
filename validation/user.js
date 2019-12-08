const Joi = require('@hapi/joi');

const userSchema = Joi.object().keys({
  firstName: Joi.string()
    .min(4)
    .max(50)
    .required(),
  lastName: Joi.string()
    .min(3)
    .max(60)
    .required(),
  role: Joi.string().valid('admin', 'writer', 'guest'),
  nickname: Joi.string()
    .min(2)
    .max(15)
});

module.exports = userSchema;
