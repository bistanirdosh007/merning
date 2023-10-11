const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema({
  province_id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Province = mongoose.model("Province", provinceSchema);

module.exports = Province;
