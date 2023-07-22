const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mailService = require("./mailService.js");
const PORT = process.env.PORT ?? 5000;

app.use(bodyParser.json());

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

app.post("/send-msg", async (req, res) => {
  const body = req.body;

  const bodyFieldList = [
    {
      field: "fullName",
      translate: "Имя",
    },
    {
      field: "email",
      translate: "Email",
    },
    {
      field: "phoneNumber",
      translate: "Номер телефона",
    },
    {
      field: "subject",
      translate: "Тема",
    },
    {
      field: "msg",
      translate: "Сообщения",
    },
  ];

  // validation body
  if (!isObject(body)) {
    return res.status(400).json({
      msg: "request body must be object",
    });
  }

  for (const bodyFieldItem of bodyFieldList) {
    const { field } = bodyFieldItem;
    if (!body[field]) {
      return res.status(400).json({
        msg: `field ${field} is empty`,
      });
    }
  }

  // form email msg

  let msg = `<div style="padding: 10px 30px;">`;

  for (const bodyFieldItem of bodyFieldList) {
    const { field, translate } = bodyFieldItem;
    msg += `<div style="margin-bottom: 20px;"><b>${translate}:</b> ${body[field]}</div></br></br>`;
  }

  msg += "</div>";

  // send email
  await mailService.send(msg);
  return res.json({
    msg: "OK",
  });
});

app.listen(PORT, () => console.log("server running on PORT:", PORT));
