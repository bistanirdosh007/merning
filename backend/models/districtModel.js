const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
  district_id: {
    type: Number,
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
});

const District = mongoose.model("District", districtSchema);

module.exports = District;
