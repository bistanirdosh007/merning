const asyncHandler = require("express-async-handler");

const Student = require("../models/studentModel");

const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find();
  res.status(200).json({ students });
});

const setStudent = asyncHandler(async (req, res) => {
  const { school_id, year, reg_id, name, gender, dob } = req.body;
  if (!school_id || !year || !reg_id || !name || !gender || !dob) {
    res.status(400);
    throw new Error("Please add all student Info");
  }
  const student = await Student.create({
    school_id: req.body.school_id,
    year: req.body.year,
    reg_id: req.body.reg_id,
    name: req.body.name,
    gender: req.body.gender,
    dob: req.body.dob,
  });
  res.status(200).json({ student });
});

module.exports = { getStudents, setStudent };
