const User = require("../model/user.model");

async function createUser(data) {
  if (!data.name || !data.email) {
    throw { status: 400, message: "Name and email are required" };
  }

  return await User.create(data);
}

async function getUserById(id) {
  const user = await User.findByPk(id);

  if (!user) {
    throw { status: 404, message: "User not found" };
  }

  return user;
}

module.exports = { createUser, getUserById };
