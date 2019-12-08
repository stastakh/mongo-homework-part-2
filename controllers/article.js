const articleModel = require('../models/article');
const userModel = require('../models/user');

module.exports = { createArticle };

async function createArticle(req, res, next) {
  const { body } = req;
  try {
    // check if user exists
    const user = await userModel.findOne({ _id: body.owner });
    const createdArticle = await articleModel.create(body);
    // increment number of articles
    await userModel.updateOne({ _id: user._id }, { $inc: { numberOfArticles: 1 } });
    res.json(createdArticle);
  } catch (err) {
    next(err);
  }
}
