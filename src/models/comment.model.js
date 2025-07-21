const mongoose = require("mongoose");

const { Schema } = mongoose;

COLLECTION_NAME = "Comments";
DATABASE_NAME = "Comment";

const commentSchema = new Schema(
  {
    comment_content: {
      type: String,
      required: [true, "A comment must have a content"],
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    comment_left: {
      type: Number,
      default: 0,
    },
    comment_right: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamp: true,
    toJSON: {
      transform(doc, data) {
        data.id = data._id;
        delete data._id;
        delete data.__v;
        return data;
      },
    },
  }
);

module.exports = mongoose.model(DATABASE_NAME, commentSchema);
