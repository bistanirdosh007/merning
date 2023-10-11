const express = require("express");
const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
const {
  getProvince,
  setProvince,
} = require("../controllers/provinceController");

module.exports = router;

router.route("/").get(getProvince).post(setProvince);
