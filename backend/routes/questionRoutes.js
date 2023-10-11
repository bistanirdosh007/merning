const express = require("express");
const router = express.Router();
const {
  protect,
  adminAuth,
  studentAuth,
} = require("../middleware/authMiddleware");
const {
  getQuestions,
  setQuestions,
} = require("../controllers/questionController");

module.exports = router;

router
  .route("/")
  .get(getQuestions)
  .get(protect, adminAuth, getQuestions)
  .post(setQuestions);
