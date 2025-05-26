const mongoose = require("mongoose");

class MongoDB {
  constructor() {
    this.connectDB();
  }

  connectDB = async () => {
    try {
      const db_password = process.env.mongodb_password;
      console.log(db_password); // Log to verify
      const conn = await mongoose.connect(
        `mongodb+srv://huyen:${db_password}@cluster0.7m3t7.mongodb.net/myblog`
      );
      console.log("MongoDB Connected...");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };
}

module.exports = new MongoDB();
