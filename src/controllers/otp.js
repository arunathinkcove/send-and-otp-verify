const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

exports.sendOTP = (req, res) => {
  const email = req.body.email;
  const otp = randomstring.generate({ length: 6, charset: 'numeric' });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.DBEMAIL,
      pass: process.env.DBPASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.DBUSER,
    to: email,
    subject: 'Email verification OTP',
    text: `Your OTP for email verification is ${otp}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to send OTP' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'OTP sent successfully' });
    }
  });
};

exports.verifyOTP = (req, res) => {
  const receivedOtp = req.body.otp;
  const otp = req.app.get('otp');

  if (receivedOtp === otp) {
    res.status(200).json({ message: 'OTP verified successfully', success: true });
  } else {
    res.status(401).json({ message: 'OTP verification failed', success: false });
  }
};
