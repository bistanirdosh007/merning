const asyncHandler = require("express-async-handler");

const Category = require("../models/questionCategoryModel");

const getCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ categories });
});

const setCategory = asyncHandler(async (req, res) => {
  if (!req.body.category) {
    res.status(400);
    throw new Error("Please add a Category");
  }
  const category = await Category.create({
    category: req.body.category,
  });
  res.status(200).json({ category });
});

module.exports = { getCategory, setCategory };
