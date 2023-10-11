const mongoose = require("mongoose");

const municipalitySchema = new mongoose.Schema({
  municipality_id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  district_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Municipality_Type",
    required: true,
  },
});

const Municipality = mongoose.model("Municipality", municipalitySchema);

module.exports = Municipality;
