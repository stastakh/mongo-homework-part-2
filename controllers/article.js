const articleModel = require('../models/article');
const userModel = require('../models/user');

module.exports = { createArticle, updateArticle, getArticles, deleteArticle };

async function createArticle(req, res, next) {
  const { body } = req;
  try {
    // check if user exists
    await userModel.findOne({ _id: body.owner });
    const createdArticle = await articleModel.create(body);
    // increment number of articles
    await userModel.updateOne(
      { _id: body.owner },
      { $inc: { numberOfArticles: 1 } }
    );
    res.json(createdArticle);
  } catch (err) {
    next(err);
  }
}

async function updateArticle(req, res, next) {
  const { body, params } = req;
  try {
    // check if article and user exist
    await articleModel.findOne({ _id: params.id });
    await userModel.findOne({ _id: body.owner });
    const updatedInfo = await articleModel.updateOne(
      { _id: params.id },
      { ...body, updatedAt: Date.now() }
    );
    res.json(updatedInfo);
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
