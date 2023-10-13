const asyncHandler = require("express-async-handler");
const paginationMiddleware = require("../middleware/paginationMiddleware");
const Municipality = require("../models/municipalityModel");
const searchMiddleware = require("../middleware/searchMiddleware");

const getMunicipality = paginationMiddleware(Municipality);

// Use the search middleware for Districts
const searchMunicipalityController = searchMiddleware(Municipality, ["name"]);

// Search districts
const searchMunicipality = asyncHandler(async (req, res) => {
  console.log(res.locals.filteredResults);
  if (res.locals.filteredResults && res.locals.filteredResults.length > 0) {
    res.status(200).json({ districts: res.locals.filteredResults });
  } else {
    res.status(404).json({ error: "No matching districts found." });
  }
});

module.exports = {
  getMunicipality,
  searchMunicipality,
  searchMunicipalityController,
};
