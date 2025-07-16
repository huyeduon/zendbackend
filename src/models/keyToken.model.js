const mongoose = require("mongoose");

const { Schema } = mongoose;

COLLECTION_NAME = "KeyTokens";
DATABASE_NAME = "KeyToken";

const keyTokenSchema = new Schema(
  {
    refresh_token: {
      type: String,
    },

    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

module.exports = mongoose.model(DATABASE_NAME, keyTokenSchema);
