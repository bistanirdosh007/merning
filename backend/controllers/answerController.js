const asyncHandler = require("express-async-handler");

const Answer = require("../models/answerModel");
const Student = require("../models/studentModel");
const Question = require("../models/questionModel");
const Suspected = require("../models/suspectedModel");

const getAnswers = asyncHandler(async (req, res) => {
  try {
    const studentId = req.params.id;
    // Find the student by their ID
    const student = await Student.findById(studentId).select(
      "_id name reg_id gender"
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    // Find all answers for the specified student
    const studentAnswers = await Answer.find({ studentId }).populate("_id");
    res.json({
      student: student,
      answers: studentAnswers,
    });
  } catch (error) {
    console.error("Error fetching student answers:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching student answers." });
  }

  const answers = await Answer.find();
  res.status(200).json({ answers });
});

const setAnswers = asyncHandler(async (req, res) => {
  try {
    const { studentId, selectedOptions, year } = req.body;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }
    // Check if the student has already answered questions for the specified year
    const existingAnswers = await Answer.find({ studentId, year });
    if (existingAnswers.length > 0) {
      return res.status(400).json({
        error: `Student has already answered questions for year ${year}.`,
      });
    }

    //check student age to retrieve relevant question set
    let set;
    const studentAge = student.age;
    if (studentAge > 2 && studentAge < 4) {
      set = 1;
    } else {
      set = 2;
    }
    const validQuestionIds = await Question.find({ question_set: set });
    console.log(validQuestionIds);

    // Validate the selected options and question IDs
    for (const option of selectedOptions) {
      if (!validQuestionIds.includes(option.questionId)) {
        return res
          .status(400)
          .json({ error: `Question not found: ${option.questionId}` });
      }
    }
    const newAnswer = await Answer.create({
      studentId,
      year,
      selectedOptions,
    });
    student.is_screened = true;
    await processAnswers(selectedOptions, student);

    res.status(200).json({ newAnswer });
  } catch (error) {
    console.error("Error adding student answers:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding student answers." });
  }
});

// Function to process answers
async function processAnswers(selectedOptions, student) {
  try {
    // Loop through each selected option
    for (const option of selectedOptions) {
      console.log("option:", option.option_value);

      const question = await Question.findById(option.questionId);
      const optionValue = option.option_value;
      if (!question || !optionValue) {
        // Handle the case where either question or selectedOption is not found
        console.error("Question or selectedOption not found.");
        continue; // Skip this iteration and move to the next option
      }
      console.log("qeustion:", question.question_code);
      console.log("option:", option);
      // preparing for the suspected logic
      const suspectedList = [];
      if (
        (question.question_code === "CF2" ||
          question.question_code === "CF3") &&
        optionValue >= 3
      ) {
        suspectedList.push(3);
      }
    }

    console.log("Processing completed.");
  } catch (error) {
    console.error("Error processing answers:", error);
  }
}

module.exports = { getAnswers, setAnswers };
