const asyncHandler = require("express-async-handler");

const Question = require("../models/questionModel");

const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find();
  res.status(200).json({ questions });
});

const setQuestions = asyncHandler(async (req, res) => {
  const {
    question_code,
    question_text,
    question_set,
    question_category,
    options,
  } = req.body;
  console.log(options);
  if (
    !question_code ||
    !question_text ||
    !question_set ||
    !question_category ||
    !options
  ) {
    res.status(400);
    throw new Error("Please add all Questions Info");
  }
  const question = await Question.create({
    question_code: req.body.question_code,
    question_text: req.body.question_text,
    question_set: req.body.question_set,
    question_category: req.body.question_category,
    options: req.body.options,
  });
  res.status(200).json({ question });
});

module.exports = { getQuestions, setQuestions };
