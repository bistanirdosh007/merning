const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, No Token");
  }
});

const adminAuth = asyncHandler(async (req, res, next) => {
  // Check if the user has the "admin" role
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
});

const teacherAuth = asyncHandler(async (req, res, next) => {
  // Check if the user has the "Teacher" role
  if (req.user.role !== "Teacher") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
});

const studentAuth = asyncHandler(async (req, res, next) => {
  // Check if the user has the "Student" role
  if (req.user.role !== "Student") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
});

module.exports = { protect, adminAuth, studentAuth, teacherAuth };
