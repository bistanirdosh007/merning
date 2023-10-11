const asyncHandler = require("express-async-handler");
const District = require("../models/districtModel");
const paginationMiddleware = require("../middleware/paginationMiddleware");

const getDistrict = paginationMiddleware(District);

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

module.exports = { getDistrict, setProvince };
