const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail.com",
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD
    }
});

module.exports = transporter;