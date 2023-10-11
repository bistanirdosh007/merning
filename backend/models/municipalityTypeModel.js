const mongoose = require("mongoose");

const munTypeSchema = new mongoose.Schema({
  type: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Province = mongoose.model("Municipality_Type", munTypeSchema);

module.exports = Province;
