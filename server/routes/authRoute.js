const express = require("express");
const {
  signUp,
  login,
  google,
  logout,
  deleteUser
} = require("../controllers/signUpController.js");
//const login = require("../controllers/signUpController.js");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/google", google);
router.post("/logout", logout);
router.delete("/delete", deleteUser);

module.exports = router;
