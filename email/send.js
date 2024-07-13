const dotenv = require('dotenv')
const nodemailer = require("nodemailer");

dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function send(name, to, subject, textBody, htmlBody) {
  const from = process.env.SMTP_USER
  const info = await transporter.sendMail({
    from: '"' + name +'" <' + from + '>',
    to: to,
    subject: subject,
    text: textBody,
    html: htmlBody,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = {send}