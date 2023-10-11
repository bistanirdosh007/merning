const mongoose = require("mongoose");

const genderSchema = mongoose.Schema(
  {
    gender: {
      type: String,
      required: true,
      enum: ["Female", "Male", "Third"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gender", genderSchema);
