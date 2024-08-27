const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getMe,
  forgotPassword
} = require("../controllers/userController");

const sessionCheckMiddleware = require("../middleware/sessionCheckMiddleware"); // Adjust the path to your middleware

const { protect } = require("../middleware/authMiddleware");

module.exports = router;

router.post("/", registerUser);
router.post("/login", sessionCheckMiddleware, loginUser);
router.get("/me", protect, getMe);
router.get("/reset-password", forgotPassword);
