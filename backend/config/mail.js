const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const createTransporter = require("./emailTransporter"); // Adjust the path as needed
const handlebars = require("handlebars");
const fs = require("fs");

// Generic function to send an email
async function sendEmail(email, subject, templatePath, context) {
  try {
    // Create a Nodemailer transporter using your email service provider's SMTP settings
    const transporter = createTransporter();

    // Read the email template file
    const emailTemplateSource = fs.readFileSync(templatePath, "utf8");

    // Compile the template
    const template = handlebars.compile(emailTemplateSource);

    // Render the HTML for the email
    const html = template(context);

    // Compose the email
    const mailOptions = {
      from: process.env.EMAIL_USERNAME, // Sender's email address
      to: email, // Recipient's email address
      subject, // Subject of the email
      html, // The rendered HTML content
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log(`${subject} email sent:`, info.response);
  } catch (error) {
    console.error("Email sending error:", error);
    throw error; // Handle the error as needed
  }
}

// Helper function to send a verification email
async function sendVerificationEmail(email, token) {
  const context = {
    verificationLink: `http://localhost:5000/api/verify/${token}`,
  };
  await sendEmail(email, "Account Verification", "backend/templates/verificationEmail.hbs", context);
}

// Helper function to send a reset password email
async function sendResetPasswordEmail(email, token) {
  const context = {
    resetPasswordLink: `http://localhost:5000/api/reset-password/${token}`,
  };
  await sendEmail(email, "Reset Your Password", "backend/templates/resetPasswordEmail.hbs", context);
}

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
};
