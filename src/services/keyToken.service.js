const MyModel = require("../models/keyToken.model");

// Create a new category
const createToken = async ({ refresh_token, userid }) => {
  await MyModel.findOneAndUpdate(
    { userid: userid },
    { refresh_token },
    { upsert: true, new: true }
  );
  return { message: "Create Token Successfully" };
};

// Return a object if found
const findOne = async ({ refresh_token, userId }) => {
  console.log(userId, refresh_token);
  return await MyModel.findOne({ userid: userId, refresh_token });
};

module.exports = {
  createToken,
  findOne,
};
