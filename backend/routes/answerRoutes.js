const express = require("express");
const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
const { getAnswers, setAnswers } = require("../controllers/answerController");

module.exports = router;

router.route("/:id").get(getAnswers);
router.route("/").post(setAnswers);
