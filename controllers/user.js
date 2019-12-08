const userModel = require('../models/user');

module.exports = { createUser, updateUser };

async function createUser(req, res, next) {
  const { body } = req;
  try {
    const createdUser = await userModel.create(body);
    res.json(createdUser);
  } catch (err) {
    throw err;
  }
}

async function updateUser(req, res, next) {
  const { body, params } = req;
  try {
    const updatedUser = await userModel.updateOne({ _id: params.id }, body);
    res.json(updatedUser);
  } catch (err) {
    throw err;
  }
}
