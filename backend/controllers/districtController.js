const asyncHandler = require("express-async-handler");
const District = require("../models/districtModel");
const paginationMiddleware = require("../middleware/paginationMiddleware");
const searchMiddleware = require("../middleware/searchMiddleware");

const getDistrict = paginationMiddleware(District);

// Use the search middleware for Districts
const searchDistrictsController = searchMiddleware(District, ["name"]);

// Search districts
const searchDistricts = asyncHandler(async (req, res) => {
  console.log(res.locals.filteredResults);
  if (res.locals.filteredResults && res.locals.filteredResults.length > 0) {
    res.status(200).json({ districts: res.locals.filteredResults });
  } else {
    res.status(404).json({ error: "No matching districts found." });
  }
});

const setProvince = asyncHandler(async (req, res) => {
  if (!req.body.gender) {
    res.status(400);
    throw new Error("Please add a gender");
  }
  const gender = await Gender.create({
    gender: req.body.gender,
  });
  res.status(200).json({ message: `Set Gender ` });
});

module.exports = {
  getDistrict,
  setProvince,
  searchDistrictsController,
  searchDistricts,
};
