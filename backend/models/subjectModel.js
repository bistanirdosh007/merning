const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  subject_name: {
    type: String,
    required: true,
    trim: true
  },
  subject_code: {
    type: String,
    required: true,
  },
  isFullCW: {
    type: Boolean,
    required: true,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  },
  number_of_groups: {
    type: Number,
    default: 0,
    min: 0
  }
});

const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;
