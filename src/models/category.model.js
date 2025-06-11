const mongoose = require("mongoose");
const slugify = require("slugify");
const { Schema } = mongoose;

COLLECTION_NAME = "Categories";
DATABASE_NAME = "Category";

const categorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: [true, "Category must have a name."],
    },
    category_slug: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    ordering: {
      type: Number,
      required: [true, "Ordering must be a number."],
    },

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

categorySchema.pre("save", function (next) {
  if (this.isModified("category_name"))
    this.category_slug = slugify(this.category_name);
  next();
});

module.exports = mongoose.model(DATABASE_NAME, categorySchema);
