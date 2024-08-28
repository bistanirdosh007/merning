const express = require("express");
const router = express.Router();
const { protect, adminAuth } = require("../middleware/authMiddleware");
const { getGender, setGender, deleteGender, updateGender } = require("../controllers/genderController");

module.exports = router;

router.route("/").get(protect, adminAuth,  getGender).post(protect, adminAuth, setGender);
router.route("/:id").put(protect, adminAuth, updateGender).delete(protect, adminAuth, deleteGender);
