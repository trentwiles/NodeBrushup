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

function convertEmailListToFormat(emailList){
    // emailList should look like ["x@y.com", "z@x.com", ...]
    if(emailList.length == 1){
        return emailList[0]
    }
    var str = ""
    for(var i = 0; i < emailList.length; i++){
        str += `${emailList[i]},`
    }
    // return with the last , trimmed off
    return str.substring(0,str.length-1)
}

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

module.exports = {
    send,
    convertEmailListToFormat
}