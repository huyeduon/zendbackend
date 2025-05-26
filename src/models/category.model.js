const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
  catetory_name: String,
  status: String,
  ordering: Number,
  isShowHome: Boolean,
});

module.exports = mongoose.model("category", categorySchema);
