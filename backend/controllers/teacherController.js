const asyncHandler = require("express-async-handler");

const Teacher = require("../models/teacherModel");

const getTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find();
  res.status(200).json({ teachers });
});

const setTeacher = asyncHandler(async (req, res) => {
  const { school_id, contact_no, name, email, gender, dob } = req.body;
  if (!school_id || !contact_no || !email || !name || !gender || !dob) {
    res.status(400);
    throw new Error("Please add all teacher Info");
  }

  checkIfUserExists(email, "Teacher");
  const teacher = await Teacher.create({
    school_id: req.body.school_id,
    name: req.body.name,
    gender: req.body.gender,
    dob: req.body.dob,
    contact_no: req.body.contact_no,
    email: req.body.email,
  });
  res.status(200).json({ teacher });
});

module.exports = { getTeachers, setTeacher };
