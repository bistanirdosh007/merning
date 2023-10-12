const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const referredDomainSchema = new Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  referredDomain: {
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
  referTo: {
    type: String,
    required: true,
  },
  referToOthers: {
    type: String,
  },
  serviceProviderName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
  },
});

const ReferredDomain = mongoose.model("ReferredDomain", referredDomainSchema);

module.exports = ReferredDomain;
