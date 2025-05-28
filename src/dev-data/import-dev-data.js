const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("../models/category.model");

dotenv.config({ path: "../.env" });
const connectDB = async () => {
  try {
    const db_password = process.env.mongodb_password;
    console.log(db_password); // Log to verify
    const conn = await mongoose.connect(
      `mongodb+srv://huyen:${db_password}@cluster0.7m3t7.mongodb.net/myblog`
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};
connectDB();
// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/category-data.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Category.create(tours);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Category.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
