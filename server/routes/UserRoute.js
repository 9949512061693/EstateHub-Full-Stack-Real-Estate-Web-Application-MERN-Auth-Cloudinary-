const express = require("express");
const userProfileUpdate = require("../controllers/userController");
const multer = require("multer");

// correct multer config
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.put("/update", upload.single("avatar"), userProfileUpdate);

module.exports = router;
