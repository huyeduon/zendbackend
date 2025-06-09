const { mongoose } = require("mongoose");

const CheckObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = {
  CheckObjectId,
};
