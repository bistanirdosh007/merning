const asyncHandler = require("express-async-handler");

const Municipality_Type = require("../models/municipalityTypeModel");

const getmunicipalitytypes = asyncHandler(async (req, res) => {
  const municipalities = await Municipality_Type.find();
  res.status(200).json({ municipalities });
});

const setmunicipalitytypes = asyncHandler(async (req, res) => {
  const { type, name } = req.body;
  if (!type || !name) {
    res.status(400);
    throw new Error("Please add a Type");
  }
  const municipality_type = await Municipality_Type.create({
    type: req.body.type,
    name: req.body.name,
  });
  res.status(200).json({ municipality_type });
});

module.exports = { getmunicipalitytypes, setmunicipalitytypes };
