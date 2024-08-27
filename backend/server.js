const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const session = require("express-session");

const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/genders", require("./routes/genderRoutes"));
app.use("/api/provinces", require("./routes/provinceRoutes"));
app.use("/api/districts", require("./routes/districtRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/teachers", require("./routes/teacherRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/questionnaires", require("./routes/answerRoutes"));
app.use("/api/question_categories", require("./routes/questioncategoryRoutes"));
app.use("/api/municipality_types", require("./routes/municipalitytypeRoutes"));
app.use("/api/municipalities", require("./routes/municipalityRoutes"));
app.use("/api/schools", require("./routes/schoolRoutes"));
app.use("/api/importFiles", require("./routes/importexcelRoutes"));
app.use("/api/verify", require("./routes/verificationRoutes"));
app.use("/api/reset-password", require("./routes/passwordRoutes"));
app.use("/api/uploadFiles", require("./routes/uploadRoutes"));
app.use("/api/downloadFiles", require("./routes/downloadRoutes"));

app.listen(port, () => console.log(`Server Started on ${port}`));
