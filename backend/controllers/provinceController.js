const asyncHandler = require("express-async-handler");

const Province = require("../models/provinceModel");

const getProvince = asyncHandler(async (req, res) => {
  const provinces = await Province.find();
  res.status(200).json({ provinces });
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

module.exports = { getProvince, setProvince };
