'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

// Mailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'Owenbond23@gmail.com',
    pass: 'Hunter1343361!',
  },
});

app.post('/signup', (req, res) => {
  const { fname, lname, email } = req.body;
  console.log('Received a signup request');

  const mailOptions = {
    from: 'Owenbond23@gmail.com',
    to: email,
    subject: 'Welcome to Space Facts!',
    text: `Hello ${fname} ${lname},\n\nThank you for signing up to receive daily space facts!\n\nBest regards,\nThe Space Facts Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('An error occurred while signing up.');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Sign-up successful!');
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
