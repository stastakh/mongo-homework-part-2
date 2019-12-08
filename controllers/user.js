const userModel = require('../models/user');

module.exports = { createUser, updateUser, getUserById, deleteUser };

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
    const updateInfo = await userModel.updateOne({ _id: params.id }, body);
    res.json(updateInfo);
  } catch (err) {
    throw err;
  }
}

async function getUserById(req, res, next) {
  const { params } = req;
  try {
    const user = await userModel.findOne({ _id: params.id });
    res.json(user);
  } catch (err) {
    throw err;
  }
}

async function deleteUser(req, res, next) {
  const { params } = req;
  try {
    const deleteInfo = await userModel.deleteOne({ _id: params.id });
    res.json(deleteInfo);
  } catch (err) {
    throw err;
  }
}
