const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
    emis_code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const School = mongoose.model("School", schoolSchema);

module.exports = School;
