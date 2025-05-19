const mongoose = require("mongoose");

class MongoDB {
  constructor() {
    this.connectDB();
  }

  connectDB = async () => {
    try {
      const conn = await mongoose.connect(
        "mongodb+srv://huyen:huyenzend@cluster0.7m3t7.mongodb.net/"
      );
      console.log("MongoDB Connected...");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };
}

module.exports = new MongoDB();
