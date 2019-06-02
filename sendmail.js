const nodemailer = require("nodemailer");
const path = require("path");

class Nodemailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "bcchain@mail.ru", // generated ethereal user
        pass: "DocumentsBlockchain" // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  notifySigners(fio, doc_name, recipients, Allrecip, filename, filepath) {
    const output = `
    <p>Пользователь ${fio} подписал документ ${doc_name} и теперь приглашает вас к подписанию.</p>
    <p>Вы можете ознакомиться с данным документом и подписать его либо проигнорировать данное сообщение.</p>
    <hr>
    <p>Для подписи документа перейдите по ссылке http://localhost:8080?emails=${Allrecip}</p>
    <p>При подписании в качестве загружаемого файла используйте файл ${doc_name}, который прикреплен к данному письму.</p>
  `;
    // setup email data with unicode symbols
    var mailOptions = {
      from: '"Document\'s blockchain" <bcchain@mail.ru>', // sender address
      to: recipients, // list of receivers
      subject: "Новое приглашение к подписи", // Subject line
      html: output, // html body
      attachments: [
        {
          filename: `document.${path.extname(filename)}`,
          path: filepath
        }
      ]
    };
    // send mail with defined transport object
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  }

  notifySignEvent(fio, doc_name, recipients, Allrecip, filename, filepath) {
    const output = `
    <p>Приглашенный пользователь ${fio} подписал документ ${doc_name} </p>
    <p>Вы можете ознакомиться с данным документом и подписать его если еще этого не сделали.</p>
    <hr>
    <p>Для подписи документа перейдите по ссылке http://localhost:8080?emails=${Allrecip}</p>
    <p>При подписании в качестве загружаемого файла используйте файл ${doc_name}, который прикреплен к данному письму.</p>
  `;
    // setup email data with unicode symbols
    var mailOptions = {
      from: '"Document\'s blockchain" <bcchain@mail.ru>', // sender address
      to: recipients, // list of receivers
      subject: "Новое подписание документа", // Subject line
      html: output, // html body
      attachments: [
        {
          filename: `document.${path.extname(filename)}`,
          path: filepath
        }
      ]
    };
    // send mail with defined transport object
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  }

  sendCode(code, recipient) {
    const output = `
    <p>Код для подтверждения адреса электронной почты - <strong>${code}</strong></p>
  `;
    // setup email data with unicode symbols
    var mailOptions = {
      from: '"Document\'s blockchain" <bcchain@mail.ru>', // sender address
      to: recipient, // list of receivers
      subject: "Код подтверждения регистрации", // Subject line
      html: output // html body
    };
    // send mail with defined transport object
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error.responseCode + " " + error.response);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  }
}

module.exports = Nodemailer;
