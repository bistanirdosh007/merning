const express = require("express");
const router = express.Router();
const {  changePassword } = require("../controllers/passwordController");

module.exports = router;

router.route("/:token").get(changePassword);
