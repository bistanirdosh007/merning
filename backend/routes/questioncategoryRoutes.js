const express = require("express");
const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
const {
  getCategory,
  setCategory,
} = require("../controllers/questioncategoryController");

module.exports = router;

router.route("/").get(getCategory).post(setCategory);
