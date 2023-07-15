const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    // https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });
  }
  async send(msg) {
    const info = await this.transporter.sendMail({
      from: `"Hi Umen" <${process.env.MAIL_USERNAME}>`, // sender address
      to: process.env.RECIPIENT_EMAIL, // list of receivers
      subject: "Новое сообщение", // Subject line
      html: msg, // html body
    });

    return info.messageId.toString();
  }
}

module.exports = new MailService();
