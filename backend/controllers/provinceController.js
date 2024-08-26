const asyncHandler = require("express-async-handler");

const Province = require("../models/provinceModel");

const getProvince = asyncHandler(async (req, res) => {
  const provinces = await Province.find();
  res.status(200).json({ provinces });
});

const setProvince = asyncHandler(async (req, res) => {
  if (!req.body.province_name) {
    res.status(400);
    throw new Error("Please add a province");
  }
  const province = await Province.create({
    province_name: req.body.province_name,
  });
  res.status(200).json({ message: `Province Set ` });
});

module.exports = { getProvince, setProvince };
