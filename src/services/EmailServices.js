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
    tls: {
      rejectUnauthorized: false, // Bỏ qua xác thực TLS, cần kiểm tra khi sử dụng dịch vụ sản xuất
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
      console.log("info", info);
      return {
        msg: "tou should",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      };
    })
    .catch((error) => {
      return error;
    });
};

const sendEmailCreateUser = async (email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // Bỏ qua xác thực TLS, cần kiểm tra khi sử dụng dịch vụ sản xuất
    },
  });

  const numbers = [];
  for (let i = 0; i < 6; i++) {
    numbers.push(Math.floor(Math.random() * 10));
  }
  numbers.join("");

  const message = {
    from: process.env.MAIL_ACCOUNT,
    to: email,
    subject: "Đây là mã OTP của bạn! ",
    // text: "Hello world?",
    html: `<h3>FIVE MAN STORE</h3> </b>Mã OTP của bạn là: ${numbers.join(
      ""
    )}</b> <div>*Lưu ý: Mã này sẽ hết hạn sau 5 phút</div>`,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return numbers.join("");
    })
    .catch((error) => {
      return error;
    });

  return numbers.join("");
};

module.exports = {
  sendEmailCreateOrder,
  sendEmailCreateUser,
};
