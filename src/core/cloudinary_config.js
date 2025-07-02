const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});

// console.log(process.env.cloudinary_api_secret);

module.exports = cloudinary;
