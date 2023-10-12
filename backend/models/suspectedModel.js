const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const suspectedSchema = new Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  suspectedImpairment: {
    type: {
      vision: {
        type: Boolean,
        default: false,
      },
      hearing: {
        type: Boolean,
        default: false,
      },
      physical: {
        type: Boolean,
        default: false,
      },
      cognition: {
        type: Boolean,
        default: false,
      },
    },
    required: true,
  },
});

const suspected = mongoose.model("Suspected", suspectedSchema);

module.exports = suspected;
