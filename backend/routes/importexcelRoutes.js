const express = require("express");
const router = express.Router();
const { protect, adminAuth } = require("../middleware/authMiddleware");
const {
  import_school,
  import_disability,
} = require("../controllers/importExcelController");

module.exports = router;

router.route("/schools").post(protect, adminAuth, import_school);
router.route("/disabilityQuestion").post(protect, adminAuth, import_disability);
