const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  school_code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  province_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Province",
    required: true,
  },
  district_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
    required: true,
  },
  municipality_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Municipality",
    required: true,
  },
  contact_no: {
    type: String,
    required: true,
  },
});

const School = mongoose.model("School", schoolSchema);

module.exports = School;
