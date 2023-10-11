const ExcelJS = require("exceljs");
const School = require("../models/schoolModel");
const Question = require("../models/questionModel");
const Question_Category = require("../models/questionCategoryModel");

const import_school = async (req, res) => {
  const workbook = new ExcelJS.Workbook();

  // Read the Excel file
  workbook.xlsx
    .readFile("schools.xlsx")
    .then(() => {
      const worksheet = workbook.getWorksheet("Sheet1");
      // Iterate through rows and save data to MongoDB
      worksheet.eachRow(async function (row, rowNumber) {
        if (rowNumber !== 1) {
          // Skip the header row
          const name = row.getCell(1).value;
          const district = row.getCell(2).value;
          const emis_code = row.getCell(3).value;

          const existingschool = await School.findOne({ emis_code });
          // Create a new Mongoose model and save it
          if (!existingschool) {
            const excelData = new School({
              name,
              district,
              emis_code,
            });
            excelData
              .save()
              .then(() => {
                console.log(`Saved row ${rowNumber} to MongoDB`);
              })
              .catch((error) => {
                console.error("Error saving to MongoDB:", error);
              });
          }
        }
      });

      res.status(200).json({ message: "Excel data imported successfully" });
    })
    .catch((error) => {
      console.error("Error reading Excel file:", error);
      res.status(500).json({ error: "Error reading Excel file" });
    });
};

const import_disability = async (req, res) => {
  const workbook = new ExcelJS.Workbook();

  // Read the Excel file
  workbook.xlsx
    .readFile("disability_questions.xlsx")
    .then(async () => {
      const worksheet = workbook.getWorksheet("Questionnaires");
      // Delete existing documents in the collection
      await Question.deleteMany({});
      // Iterate through rows and save data to MongoDB
      worksheet.eachRow(async function (row, rowNumber) {
        if (rowNumber !== 1) {
          // Skip the header row
          const question_code = row.getCell(1).value;
          const question_text = row.getCell(2).value;
          const question_set = row.getCell(3).value;
          const categoryName = row.getCell(4).value;
          const options = [];
          // Find the index of the last non-empty cell in the row
          const lastNonEmptyCellIndex = row.actualCellCount;

          for (let col = 5; col <= lastNonEmptyCellIndex; col++) {
            const option_text = row.getCell(col).value;
            if (option_text) {
              const option_value = options.length + 1;
              options.push({ option_text, option_value });
            }
          }

          // Find the category by name
          const category = await findCategoryByName(categoryName);

          const questions = await Question.findOne();
          // Create a new Mongoose model and save it
          if (!questions) {
            const excelData = new Question({
              question_code,
              question_text,
              question_set,
              question_category: category._id,
              options,
            });
            excelData
              .save()
              .then(() => {
                console.log(`Saved row ${rowNumber} to MongoDB`);
              })
              .catch((error) => {
                console.error("Error saving to MongoDB:", error);
              });
          }
        }
      });

      res.status(200).json({ message: "Excel data imported successfully." });
    })
    .catch((error) => {
      console.error("Error reading Excel file:", error);
      res.status(500).json({ error: "Error reading Excel file" });
    });
};

async function findCategoryByName(categoryName) {
  try {
    return (category = await Question_Category.findOne({
      category: categoryName,
    }));
  } catch (error) {
    // Handle the error as needed, e.g., log it or return an error response
    console.error("Error in findCategoryByName:", error);
    throw new Error("Failed to find a category.");
  }
}

module.exports = { import_school, import_disability };
