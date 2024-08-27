const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const createTransporter = require("./emailTransporter"); // Adjust the path as needed
const handlebars = require("handlebars");
const fs = require("fs");

// Helper function to send a verification email
async function sendVerificationEmail(email, token) {
  try {
    // Create a Nodemailer transporter using your email service provider's SMTP settings
    const transporter = createTransporter()

    // Read the email template file
    const emailTemplateSource = fs.readFileSync(
      "backend/templates/verificationEmail.hbs",
      "utf8"
    );

    // Compile the template
    const template = handlebars.compile(emailTemplateSource);

    // Define template variables
    const context = {
      verificationLink: `http://localhost:5000/api/verify/${token}`,
    };

    // Render the HTML for the email
    const html = template(context);

    // Compose the email
    const mailOptions = {
      from: process.env.EMAIL_USERNAME, // Sender's email address
      to: email, // Recipient's email address
      subject: "Account Verification",
      html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Verification email sent:", info.response);
  } catch (error) {
    console.error("Email sending error:", error);
    throw error; // You can handle the error as per your application's requirements
  }
}

// Helper function to send a reset password email
async function sendResetPasswordEmail(email, token) {
  try {
    // Create a Nodemailer transporter using your email service provider's SMTP settings
    const transporter = createTransporter()

    // Read the email template file
    const emailTemplateSource = fs.readFileSync(
      "backend/templates/resetPasswordEmail.hbs",
      "utf8"
    );

    // Compile the template
    const template = handlebars.compile(emailTemplateSource);

    // Define template variables
    const context = {
      resetPasswordLink: `http://localhost:5000/api/reset-password/${token}`,
    };

    // Render the HTML for the email
    const html = template(context);

    // Compose the email
    const mailOptions = {
      from: process.env.EMAIL_USERNAME, // Sender's email address
      to: email, // Recipient's email address
      subject: "Reset Your Password",
      html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Reset password email sent:", info.response);
  } catch (error) {
    console.error("Email sending error:", error);
    throw error; // You can handle the error as per your application's requirements
  }
}

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail
};
