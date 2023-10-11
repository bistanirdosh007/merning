const express = require("express");
const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
const { downloadFile } = require("../controllers/downloadController");

module.exports = router;

router.route("/:filename").get(downloadFile);
