const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmailCreateOrder = async (
  email,
  orderItems,
  totalPrice,
  shippingPrice
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let listItem = "";
  const attachImage = [];
  orderItems.forEach((order, index) => {
    listItem += `<div><b>${index + 1}: </b><b>${order?.name}</b> Số lượng: <b>${
      order?.amount
    }</b> Giá: <b>${order?.price}.000đ</b></div>`;
    attachImage.push({ path: order?.image });
  });

  const message = {
    from: process.env.MAIL_ACCOUNT, // sender address
    to: email, // list of receivers
    subject: "Bạn đã đặt hàng thành công tại FIVE MAN STORE ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<div><b>ĐƠN HÀNG CỦA BẠN:</b></div><div>${listItem}</div><div>Phí ship: <b>${shippingPrice}.000đ</b></div><div><b>Tổng số tiền thanh toán là ${totalPrice}.000đ</b></div>`, // html body
    attachments: attachImage,
  };

  transporter
    .sendMail(message)
    .then((info) => {
      console.log('info', info)
      return {
        msg: "tou should",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      };
    })
    .catch((error) => {
      return json({ error });
    });
};

module.exports = {
  sendEmailCreateOrder,
};
