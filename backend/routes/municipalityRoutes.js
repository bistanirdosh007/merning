const express = require("express");
const router = express.Router();
const { protect, adminAuth } = require("../middleware/authMiddleware");
const {
  getMunicipality,
  searchMunicipality,
  searchMunicipalityController,
} = require("../controllers/municipalityController");

const Municipality = require("../models/municipalityModel");
const paginationMiddleware = require("../middleware/paginationMiddleware");

module.exports = router;

router
  .route("/")
  .get(paginationMiddleware(Municipality), protect, getMunicipality);
router.get("/search", searchMunicipalityController, searchMunicipality);
