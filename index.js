import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Setup mail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address from .env
    pass: process.env.GMAIL_PASS  // Your Gmail password or app password from .env
  }
});

// Endpoint to send email
app.post('/send-email', (req, res) => {
  const { subject, text } = req.body; // Extracting only subject and text from the request

  // Log the request body for debugging
  console.log("Request body:", req.body);

  // Mail options, always sending to the fixed email address
  const mailOptions = {
    from: process.env.GMAIL_USER, // Sender email, same as authenticated user
    to: 'haileabshimels369@gmail.com', // Fixed recipient email address
    subject: subject,
    text: text
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});