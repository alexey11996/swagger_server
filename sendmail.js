const nodemailer = require("nodemailer");

exports.notifySigners = function(
  fio,
  doc_name,
  recipients,
  filename,
  filepath
) {
  const output = `
      <p>Пользователь ${fio} подписал документ ${doc_name} и теперь приглашает вас к подписанию.</p>
      <p>Вы можете ознакомиться с данным документом и подписать его либо проигнорировать данное сообщение.</p>
      <hr>
      <p>При подписании в качестве загружаемого файла используйте файл ${doc_name}, который прикреплен к данному письму.</p>
    `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "alexgridnev96@mail.ru", // generated ethereal user
      pass: "123456qwe" // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Document\'s blockchain" <alexgridnev96@mail.ru>', // sender address
    to: recipients, // list of receivers
    subject: "Новое приглашение к подписи", // Subject line
    //text: "Hello world!", // plain text body
    html: output, // html body
    attachments: [
      {
        // file on disk as an attachment
        filename: filename,
        path: filepath // stream this file
      }
    ]
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};
