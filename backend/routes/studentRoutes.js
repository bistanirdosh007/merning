const express = require("express");
const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
const { getStudents, setStudent } = require("../controllers/studentController");

module.exports = router;

router.route("/").get(getStudents).post(setStudent);
