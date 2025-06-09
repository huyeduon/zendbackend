const mongoose = require("mongoose");

const { Schema } = mongoose;

COLLECTION_NAME = "Categories";
DATABASE_NAME = "Category";

const categorySchema = new Schema(
  {
    catetory_name: String,
    status: String,
    ordering: Number,
    isShowHome: Boolean,
  },
  {
    collection: COLLECTION_NAME,
    timestamp: true,
  }
);

module.exports = mongoose.model("category", categorySchema);
