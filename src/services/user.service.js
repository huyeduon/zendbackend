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

const findUserById = async (userid, select = "") => {
  return await MyModel.findById(userid).select(select);
};

const findUserByIdAndUpdatePassword = async (userid, hashedPassword) => {
  return await MyModel.findByIdAndUpdate(userid, { password: hashedPassword });
};

module.exports = {
  registerUser,
  findUserByEmail,
  findUserById,
  findUserByIdAndUpdatePassword,
};
