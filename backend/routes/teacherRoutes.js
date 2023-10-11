const express = require("express");
const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
const { getTeachers, setTeacher } = require("../controllers/teacherController");

module.exports = router;

router.route("/").get(getTeachers).post(setTeacher);
