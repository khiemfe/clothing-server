const Order = require("../models/OrderProduct");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    console.log("newOrder", newOrder);
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      phone,
      user
    } = newOrder;
    try {
      const createOrder = await Order.create({
        orderItems,
        shippingAddres: {
            fullName,
            phone,
            address
        },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        user
      });
      if (createOrder) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createOrder,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
};
