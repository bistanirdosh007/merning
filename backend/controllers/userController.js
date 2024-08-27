const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { sendVerificationEmail, sendResetPasswordEmail  } = require("../config/mail");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, contact_no } = req.body;
  //check all value input by the user

  if (!name || !email || !password || !role || !contact_no) {
    res.status(400);
    throw new Error("Add All Info");
  }
  //check if the user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Exists");
  }
  //now hash the password
  const salt = await bcrypt.genSalt(12);
  const hashedPW = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPW,
    role,
    contact_no,
  });
  const verificationToken = generateToken(user.id, user.role);
  // Send a verification email
  sendVerificationEmail(email, verificationToken);

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }

  res.json({ message: "User Registered." });
});

const loginUser = asyncHandler(async (req, res) => {
  const { contact_no, password } = req.body;

  const user = await User.findOne({ contact_no });

  if (!user.is_activated) {
    res.status(400);
    throw new Error("User is not activated. Please activate the user first.");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      contact_no: contact_no,
      token: generateToken(user._id, user.role),
    });

    if (user.is_first_login) {
      const result = await User.findOneAndUpdate(
        { contact_no },
        { $set: { is_activated: false } },
        { new: true }
      );
    }

    // req.session.userIsActive = true;
  } else {
    res.status(400);
    throw new Error("Invalied Credentials");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// Forgot Password Controller
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

    // Generate reset token
    const resetToken = generateToken(user.id, user.role);

    // Send reset password email
    sendResetPasswordEmail(email, resetToken);
  
    res.status(200).json({ message: "Password reset email sent." });
  });

//gen token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET , { expiresIn: "3m" });
};

module.exports = { registerUser, loginUser, getMe, forgotPassword };
