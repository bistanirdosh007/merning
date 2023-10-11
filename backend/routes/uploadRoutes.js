const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { uploadFile } = require("../controllers/uploadController");
const upload = require("../middleware/uploadMiddleware");

module.exports = router;

// Define an endpoint for file uploads
router.post("/", upload.single("originalname"), uploadFile);
