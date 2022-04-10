const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, textInMail) {
    this.to = user.email;
    this.firstName = user.name;
    this.textInMail = textInMail;
    this.from = `auth <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // Sendgrid
    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(subject) {
    // 1) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: this.textInMail,
    };

    // 2) Create a transport and send email
    try{
      await this.newTransport().sendMail(mailOptions);
    }catch(err){
      return;
    }
  }

  async sendMail(subject) {
    await this.send(subject);
  }
};
