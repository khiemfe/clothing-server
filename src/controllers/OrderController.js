const OrderServices = require("../services/OrderServices");
const JwtService = require("../services/JwtService");

const createOrder = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      phone,
    } = req.body;
    console.log("ppppppppppppppppp", req.body);
    console.log('kq:',paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    fullName,
    address,
    phone,)
    if (
      !paymentMethod ||
      !itemsPrice ||
      !(Number(shippingPrice) >= 0) ||
      !totalPrice ||
      !fullName ||
      !address ||
      !phone
    ) {
      return res.status(404).json({
        status: "ERR",
        message: "The input is requireddd",
      });
    }
    const response = await OrderServices.createOrder(userId, req.body);
    console.log("ggggggggggggggg", response);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllOrderDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("userId", userId);
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await OrderServices.getAllOrderDetails(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "ERR 1",
    });
  }
};

const getDetailsOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await OrderServices.getOrderDetails(orderId);
    return res.status(200).json(response);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};

const cancelOrderDetails = async (req, res) => {
  try {
    const data = req.body.orderItems;
    console.log('dataOrder', data)
    const orderId = req.body.orderId;
    console.log('orderId', orderId)
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The orderId is required",
      });
    }
    const response = await OrderServices.cancelOrderDetails(orderId, data);
    return res.status(200).json(response);
  } catch (e) {
    // console.log(e)
    return res.status(404).json({
      status: "ERR",
      message: "The err",
    });
  }
};
module.exports = {
  createOrder,
  getAllOrderDetails,
  getDetailsOrder,
  cancelOrderDetails,
};