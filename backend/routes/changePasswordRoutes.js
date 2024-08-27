const express = require("express");
const router = express.Router();
const {  changePassword } = require("../controllers/verificationController");

module.exports = router;

router.route("/:token").get(changePassword);
