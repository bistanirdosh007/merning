const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a Name"],
    },
    email: {
      type: String,
      required: [true, "Please add an Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a Password"],
    },
    role: {
      type: String,
      required: true,
      enum: ["Admin", "Student", "Teacher", "Stakeholder"],
    },
    contact_no: {
      type: String,
      required: [true, "Please add the Contact Number"],
      unique: true,
    },
    is_activated: {
      type: Boolean,
      default: false,
    },
    is_first_login: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;