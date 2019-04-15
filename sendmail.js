const nodemailer = require("nodemailer");

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

  notifySigners(fio, doc_name, recipients, filename, filepath) {
    const output = `
    <p>Пользователь ${fio} подписал документ ${doc_name} и теперь приглашает вас к подписанию.</p>
    <p>Вы можете ознакомиться с данным документом и подписать его либо проигнорировать данное сообщение.</p>
    <hr>
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
          filename: filename,
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

  notifySigEnd(recipients, doc_name, signers_arr, filename, filepath) {
    var str = "<ul>";
    signers_arr.forEach(function(signer) {
      str += "<li>" + signer + "</li>";
    });
    str += "</ul>";
    const output = `
    <p>Уведомляем вас, что документ ${doc_name} был подписан следующими лицами:</p>
    ${str}
    <p>Если данный список подписантов корректен, то документ подписан всеми сторонами.</p>
    <hr>
    <p>Подписанный документ доступен для просмотра и прикреплен к данному письму.</p>
  `;
    // setup email data with unicode symbols
    var mailOptions = {
      from: '"Document\'s blockchain" <bcchain@mail.ru>', // sender address
      to: recipients, // list of receivers
      subject: `Уведомление о подписании документа ${doc_name}`, // Subject line
      html: output, // html body
      attachments: [
        {
          filename: filename,
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
}

module.exports = Nodemailer;
