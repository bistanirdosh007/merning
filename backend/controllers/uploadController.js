const asyncHandler = require("express-async-handler");
const fs = require("fs");

const uploadFile = asyncHandler(async (req, res) => {
  try {
    const uploadedFilename = req.file.originalname;
    const existingFilePath = `backend/uploads/${uploadedFilename}`;

    if (fs.existsSync(existingFilePath)) {
      // If the file exists, replace it with the new file
      fs.unlinkSync(existingFilePath); // Delete the existing file
    }

    // Move the new file to the uploads directory
    fs.renameSync(req.file.path, existingFilePath);

    res
      .status(201)
      .json({ message: "File Uploaded successfully", uploadedFilename });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "An error occurred while uploading file." });
  }
});

module.exports = { uploadFile };
