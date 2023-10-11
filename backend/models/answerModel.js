const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    selectedOptions: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        selectedOptionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Option",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
