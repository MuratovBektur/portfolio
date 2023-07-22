class MailService {
  async send(msg) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.set(
      "Authorization",
      "Basic " + btoa(process.env.API_KEY + ":" + process.env.SECRET_KEY)
    );

    const data = JSON.stringify({
      Messages: [
        {
          From: {
            Email: process.env.SENDER_EMAIL,
            Name: process.env.SENDER_EMAIL_NAME,
          },
          To: [{ Email: process.env.RECIPIENT_EMAIL }],
          Subject: "New Message From Your Site",
          TextPart: msg,
          HTMLPart: msg,
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
    };

    const response = await fetch("https://api.mailjet.com/v3.1/send", requestOptions)
  }
}

module.exports = new MailService();
