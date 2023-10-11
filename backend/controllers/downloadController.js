const asyncHandler = require("express-async-handler");

const downloadFile = asyncHandler(async (req, res) => {
  const filename = req.params.filename;
  const filePath = `backend/uploads/${filename}`;
  res.download(filePath, (err) => {
    if (err) {
      console.error("Error while downloading file:", err);
      res.status(404).json({ error: "File not found" });
    }
  });
});

module.exports = { downloadFile };
