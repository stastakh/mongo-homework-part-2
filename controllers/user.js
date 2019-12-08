const userModel = require('../models/user');

module.exports = { createUser };

async function createUser(req, res, next) {
  const { body } = req;
  try {
    const user = await userModel.create(body);
    res.json(user);
  } catch (err) {
    throw err;
  }
}
