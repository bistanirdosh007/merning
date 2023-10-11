const express = require("express");
const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
const { getSchools, setSchool } = require("../controllers/schoolController");

module.exports = router;

router.route("/").get(getSchools).post(setSchool);
