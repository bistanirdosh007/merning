const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getDistrict,
  setProvince,
  searchDistricts,
  searchDistrictsController,
} = require("../controllers/districtController");

module.exports = router;

router.route("/").get(getDistrict).post(setProvince);
router.get("/search", searchDistrictsController, searchDistricts);
