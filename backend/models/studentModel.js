const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    school_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "School",
    },
    year: {
      type: Number,
      required: true,
    },
    reg_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Gender",
    },
    dob: {
      type: Date,
      required: true,
    },
    isScreened: {
      type: Boolean,
      default: false,
    },
    isSuspected: {
      type: Boolean,
      default: false,
    },
    isReferred: {
      type: Boolean,
      default: false,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create a virtual property 'age' based on 'date_of_birth'

studentSchema.virtual("age").get(function () {
  // Calculate the age based on the current date and 'date_of_birth'
  const currentDate = new Date();
  const birthDate = this.dob;
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  // Check if the birthday has occurred this year
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }

  return age;
});

module.exports = mongoose.model("Student", studentSchema);
