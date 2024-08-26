const asyncHandler = require("express-async-handler");

const Gender = require("../models/genderModel");

const getGender = asyncHandler(async (req, res) => {
  const genders = await Gender.find();
  res.status(200).json({ genders });
});

const setGender = asyncHandler(async (req, res) => {
  console.log(req.body.gender);
  if (!req.body.gender) {
    res.status(400);
    throw new Error("Please add a gender");
  }
  const gender = await Gender.create({
    gender: req.body.gender,
  });
  res.status(200).json({ message: `Set Gender ` });
});

module.exports = { getGender, setGender };
