const Joi = require('@hapi/joi');

const createArticleSchema = Joi.object().keys({
  title: Joi.string()
    .min(5)
    .max(400)
    .required(),
  subtitle: Joi.string().min(5),
  description: Joi.string()
    .min(5)
    .max(5000)
    .required(),
  owner: Joi.string().required(),
  category: Joi.string()
    .valid('sport', 'games', 'history')
    .required()
});

const updateArticleSchema = Joi.object().keys({
  title: Joi.string()
    .min(5)
    .max(400),
  subtitle: Joi.string().min(5),
  description: Joi.string()
    .min(5)
    .max(5000),
  owner: Joi.string(),
  category: Joi.string().valid('sport', 'games', 'history')
});

module.exports = {
  createArticleSchema,
  updateArticleSchema
};
