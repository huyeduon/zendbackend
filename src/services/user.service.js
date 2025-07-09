const MyModel = require("../models/user.model");

// Find a category by ID
const findUserByEmail = async (email) => {
  return await MyModel.findOne({ email });
};

// Create a new category
const registerUser = async (data) => {
  await MyModel.create(data);
  return { message: "Create Successfully" };
};

module.exports = {
  registerUser,
  findUserByEmail,
};
