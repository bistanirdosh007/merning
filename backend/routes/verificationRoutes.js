const express = require("express");
const router = express.Router();
const { verifyUser } = require("../controllers/verificationController");

module.exports = router;

router.route("/:token").get(verifyUser);
