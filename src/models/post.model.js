const mongoose = require("mongoose");
const slugify = require("slugify");
const { Schema } = mongoose;

COLLECTION_NAME = "Posts";
DATABASE_NAME = "Post";

const postSchema = new Schema(
  {
    post_title: {
      type: String,
      required: [true, "Post must have a title"],
    },
    post_image: {
      type: String,
    },
    post_images: {
      type: Array,
    },
    post_description: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    post_slug: String,
    status: String,
    ordering: Number,
    isShowHome: Boolean,
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

// Table posts {
//   id string
//   category_id string
//   author_id integer
//   post_title string
//   post_description string
//   post_content string
//   post_image string
//   created_at timestamp
//   published_at timestamp
//   total_comments integer
//   comments_id string
//   isShowHomw bool
//   isShowNews bool
//   status bool
//   ordering integer
// }

module.exports = mongoose.model(DATABASE_NAME, postSchema);
