const asyncHandler = require("express-async-handler");

const Gender = require("../models/genderModel");

const getGender = asyncHandler(async (req, res) => {
  const genders = await Gender.find();
  res.status(200).json({ genders });
});

const setGender = asyncHandler(async (req, res) => {
  if (!req.body.gender) {
    res.status(400);
    throw new Error("Please add a gender");
  }
  const gender = await Gender.create({
    gender: req.body.gender,
  });
  res.status(200).json({ message: `Set Gender ` });
});

// Update a gender by ID
const updateGender = asyncHandler(async (req, res) => {
  const gender = await Gender.findById(req.params.id);

  if (!gender) {
    res.status(404);
    throw new Error("Gender not found");
  }

  const updatedGender = await Gender.findByIdAndUpdate(
    req.params.id,
    req.body, // Assumes req.body contains the updated gender fields
    { new: true } // This returns the updated document
  );

  res.status(200).json({ message: "Gender updated", updatedGender });
});

// Delete a gender by ID
const deleteGender = asyncHandler(async (req, res) => {

  // Attempt to find and delete the gender
  const gender = await Gender.findByIdAndDelete(req.params.id);

  if (!gender) {
    res.status(404);
    throw new Error("Gender not found");
  }

  res.status(200).json({ message: "Gender deleted", id: req.params.id });
});

module.exports = {
  getGender,
  setGender,
  updateGender,
  deleteGender
};
