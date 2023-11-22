const OrderServices = require("../services/OrderServices");
const JwtService = require("../services/JwtService");

const createOrder = async (req, res) => {
  try {
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
    if (
      !paymentMethod ||
      !itemsPrice ||
      !shippingPrice ||
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
    const response = await OrderServices.createOrder(req.body);
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
    const orderId = req.params.id;
    console.log('orderId', orderId)
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The orderId is required",
      });
    }
    const response = await OrderServices.getAllOrderDetails(orderId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "ERR 1",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrderDetails,
};
