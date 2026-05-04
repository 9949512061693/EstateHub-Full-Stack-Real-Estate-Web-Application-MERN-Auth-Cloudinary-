const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDNAIRY_API,
  api_secret: process.env.CLOUDNAIRY_SECRET,
});

module.exports = cloudinary;
