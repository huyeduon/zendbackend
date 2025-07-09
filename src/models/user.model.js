const mongoose = require("mongoose");

const { Schema } = mongoose;

COLLECTION_NAME = "Users";
DATABASE_NAME = "User";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "User must have email"],
    },
    password: {
      type: String,
      required: [true, "User must have password"],
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

// Table users {
//   id string
//   username string
//   fullname string
//   address string
//   email string
//   avatar string
//   date_of_birth string
//   role string
//   comments_id string
// }

module.exports = mongoose.model(DATABASE_NAME, userSchema);
