const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const upload = multer({
  dest: "uploads/",
});

const {
  PropertyUpload,
  getingProperties,
  getThePropertyById,
  getMyProperties,
  deleteProperty,
} = require("../controllers/propertyController.js");

const route = express.Router();

route.post("/upload", verifyToken, upload.array("images", 5), PropertyUpload);
route.get("/properties", getingProperties);
route.get("/properties/:id", getThePropertyById);
route.get("/my-properties", verifyToken, getMyProperties);
route.delete("/delete-myProperty/:id", verifyToken, deleteProperty);
module.exports = route;
