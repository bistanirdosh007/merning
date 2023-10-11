const asyncHandler = require("express-async-handler");

const School = require("../models/schoolModel");

const getSchools = asyncHandler(async (req, res) => {
  const schools = await School.find();
  res.status(200).json({ schools });
});

const setSchool = asyncHandler(async (req, res) => {
  const {
    school_code,
    name,
    province_id,
    district_id,
    municipality_id,
    contact_no,
  } = req.body;
  if (
    !school_code ||
    !name ||
    !province_id ||
    !district_id ||
    !municipality_id ||
    !contact_no
  ) {
    res.status(400);
    throw new Error("Please add all School Info");
  }
  const school = await School.create({
    school_code: req.body.school_code,
    name: req.body.name,
    province_id: req.body.province_id,
    district_id: req.body.district_id,
    municipality_id: req.body.municipality_id,
    contact_no: req.body.contact_no,
  });
  res.status(200).json({ school });
});

module.exports = { getSchools, setSchool };
