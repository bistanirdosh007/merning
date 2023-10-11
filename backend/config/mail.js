const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const handlebars = require("handlebars");
const fs = require("fs");

// Helper function to send a verification email
async function sendVerificationEmail(email, token) {
  try {
    // Create a Nodemailer transporter using your email service provider's SMTP settings
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465, // Your SMTP port
      secure: true, // Set to true if using SSL/TLS
      // logger: true,
      // debug: true,
      secureConnection: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    // Read the email template file
    const emailTemplateSource = fs.readFileSync(
      "backend/templates/verificationEmail.hbs",
      "utf8"
    );

    // Compile the template
    const template = handlebars.compile(emailTemplateSource);

    // Define template variables
    const context = {
      verificationLink: `http://localhost:5000/verify/${token}`,
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

module.exports = {
  sendVerificationEmail,
};
