const User = require("../models/UserModel");
const uploadImage = require("../utils/avatar");
const bcrypt = require("bcryptjs");

const userProfileUpdate = async (req, res, next) => {
  try {
    let avatarUrl;

    if (req.file) {
      const uploadedImage = await uploadImage(req.file.path);
      avatarUrl = uploadedImage.url;
    }

    const updateData = {
      username: req.body.username,
      email: req.body.email,
    };

    if (req.body.password && req.body.password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updateData.password = hashedPassword;
    }

    if (avatarUrl) {
      updateData.avatar = avatarUrl;
    }

    // TEMP FIX (until auth added)
    const updatedUser = await User.findByIdAndUpdate(req.body.id, updateData, {
      returnDocument: "after",
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = userProfileUpdate;
