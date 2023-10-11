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

module.exports = { verifyUser };
