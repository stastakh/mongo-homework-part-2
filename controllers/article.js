const articleModel = require('../models/article');
const userModel = require('../models/user');

const validation = require('../validation/article');

module.exports = { createArticle, updateArticle, getArticles, deleteArticle };

async function createArticle(req, res, next) {
  const { body } = req;
  try {
    // check validation
    const { error, value } = validation.createArticleSchema.validate(body);
    if (!error) {
      // check if user exists
      await userModel.findOne({ _id: body.owner });
      const newArticle = new articleModel({
        ...value
      });
      // add article to the db
      const createdArticle = await articleModel.create(newArticle);
      // increment number of articles
      await userModel.updateOne(
        { _id: body.owner },
        { $inc: { numberOfArticles: 1 } }
      );
      res.json(createdArticle);
    } else {
      const err = {
        status: 400,
        message: error.details[0].message
      };
      throw err;
    }
  } catch (err) {
    next(err);
  }
}

async function updateArticle(req, res, next) {
  const { body, params } = req;
  try {
    // check validation
    const { error, value } = validation.updateArticleSchema.validate(body);
    if (!error) {
      // check if article and user exist
      await articleModel.findOne({ _id: params.id });
      await userModel.findOne({ _id: body.owner });
      // update article
      const updatedInfo = await articleModel.updateOne(
        { _id: params.id },
        { ...value, updatedAt: Date.now() }
      );
      res.json(updatedInfo);
    } else {
      const err = {
        status: 400,
        message: error.details[0].message
      };
      throw err;
    }
  } catch (err) {
    next(err);
  }
}

async function getArticles(req, res, next) {
  const { query } = req;
  try {
    const articles = await articleModel.find(query).populate('owner');
    res.json(articles);
  } catch (err) {
    next(err);
  }
}

async function deleteArticle(req, res, next) {
  const { params } = req;
  try {
    const article = await articleModel.findOne({ _id: params.id });
    const deleteInfo = await articleModel.deleteOne({ _id: params.id });
    await userModel.updateOne(
      { _id: article.owner },
      { $inc: { numberOfArticles: -1 } }
    );
    res.json(deleteInfo);
  } catch (err) {
    next(err);
  }
}
