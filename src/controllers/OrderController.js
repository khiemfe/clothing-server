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

module.exports = {
  createOrder,
};
