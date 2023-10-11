const express = require("express");
const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
const {
  getmunicipalitytypes,
  setmunicipalitytypes,
} = require("../controllers/municipalitytypeController");

module.exports = router;

router.route("/").get(getmunicipalitytypes).post(setmunicipalitytypes);
