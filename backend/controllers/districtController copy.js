const asyncHandler = require("express-async-handler");
const District = require("../models/districtModel");

const getDistrict = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Extract the page parameter from the query, default to 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 10;

  // Calculate the skip value to skip records based on the page and pageSize
  const skip = (page - 1) * pageSize;

  // Query the database with pagination parameters
  const districts = await District.find().skip(skip).limit(pageSize);

  // Optionally, you can also retrieve the total count of records for pagination info
  const totalRecords = await District.countDocuments();

  res.status(200).json({
    districts,
    page,
    pageSize,
    totalRecords,
  });
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

module.exports = { getDistrict, setProvince };
