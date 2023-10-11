const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  option_text: String,
  option_value: Number,
});

const questionSchema = new mongoose.Schema(
  {
    question_code: String,
    question_text: String,
    question_set: Number,
    question_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question_Category",
      required: true,
    },
    options: [optionSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);
