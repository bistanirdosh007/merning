const express = require("express");
const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
const { getGender, setGender } = require("../controllers/genderController");

module.exports = router;

router.route("/").get(getGender).post(setGender);
