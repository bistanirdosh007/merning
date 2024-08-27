const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyUser = asyncHandler(async (req, res) => {
  const verificationToken = req.params.token;
  const decoded = jwt.verify(verificationToken, process.env.JWT_SECRET);
  const updatedUser = await User.findOneAndUpdate(
    { _id: decoded.id },
    { $set: { is_activated: true } },
    { new: true }
  );

  if (updatedUser) {
    // The updatedUser now has is_activated set to true
    console.log("User has been activated:", updatedUser.email);
  } else {
    res.status(400);
    throw new Error("User not found or could not be updated.");
  }

  // Once the verification is complete, you can respond with a success message or redirect
  res.send("Email verified successfully."); // or res.redirect('/login');
});

// Function to change password
const changePassword = asyncHandler(async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  // Check if the old password matches
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Old password is incorrect.");
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(12);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);

  // Update the password
  user.password = hashedNewPassword;
  await user.save();

  res.status(200).json({ message: "Password changed successfully." });
});

module.exports = { verifyUser, changePassword };
