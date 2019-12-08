const userModel = require('../models/user');
const articleModel = require('../models/article');

const validation = require('../validation/user');

module.exports = {
  createUser,
  updateUser,
  getUserById,
  deleteUser,
  getArticlesByUserId
};

async function createUser(req, res, next) {
  const { body } = req;
  try {
    // check validation
    const { error, value } = validation.createUserSchema.validate(body);
    if (!error) {
      const newUser = new userModel({
        ...value
      });
      const createdUser = await userModel.create(newUser);
      res.json(createdUser);
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

async function updateUser(req, res, next) {
  const { body, params } = req;
  try {
    // check validation
    const { error, value } = validation.updateUserSchema.validate(body);
    if (!error) {
      // check if user exists
      await userModel.findOne({ _id: params.id });
      // update user
      const updateInfo = await userModel.updateOne({ _id: params.id }, { ...value });
      res.json(updateInfo);
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

async function getUserById(req, res, next) {
  const { params } = req;
  try {
    const user = await userModel.findOne({ _id: params.id });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  const { params } = req;
  try {
    const deleteInfo = await userModel.deleteOne({ _id: params.id });
    res.json(deleteInfo);
  } catch (err) {
    next(err);
  }
}

async function getArticlesByUserId(req, res, next) {
  const { params } = req;
  try {
    // check if user exists
    await userModel.find({ _id: params.id });
    const articles = await articleModel.find({ owner: params.id });
    res.json(articles);
  } catch (err) {
    next(err);
  }
}
