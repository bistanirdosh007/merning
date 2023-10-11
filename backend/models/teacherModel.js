const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema(
  {
    school_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "School",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact_no: {
      type: String,
      required: true,
      unique: true,
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
  },
  {
    timestamps: true,
  }
);

// Create a virtual property 'age' based on 'date_of_birth'

teacherSchema.virtual("age").get(function () {
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

module.exports = mongoose.model("Teacher", teacherSchema);
