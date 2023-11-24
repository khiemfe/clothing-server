const CartServices = require("../services/CartServices");

const createCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, amount, size, image, price } = req.body;
    if (
      !name ||
      !amount ||
      !size ||
      !image ||
      !price
    ) {
      return res.status(404).json({
        status: "ERR",
        message: "The input is requireddd",
      });
    }
    const response = await CartServices.createCart(userId, req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: 'loiloi',
    });
  }
};

const getAllCart = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("userId", userId);
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await CartServices.getAllCart(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: "ERR Cart",
    });
  }
};

// // const getDetailsOrder = async (req, res) => {
// //   try {
// //     const orderId = req.params.id;
// //     if (!orderId) {
// //       return res.status(200).json({
// //         status: "ERR",
// //         message: "The userId is required",
// //       });
// //     }
// //     const response = await OrderServices.getOrderDetails(orderId);
// //     return res.status(200).json(response);
// //   } catch (e) {
// //     // console.log(e)
// //     return res.status(404).json({
// //       message: e,
// //     });
// //   }
// // };

const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    console.log('cartId', cartId)
    if (!cartId) {
      return res.status(200).json({
        status: "ERR",
        message: "The cartId is required",
      });
    }
    const response = await CartServices.deleteCart(cartId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteManyCart = async (req, res) => {
  try {
    const ids = req.body.ids; 
    console.log("ids2", ids);
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "The ids is required",
      });
    }
    const response = await CartServices.deleteManyCart(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
module.exports = {
  createCart,
  getAllCart,
  // getDetailsOrder,
  deleteCart,
  deleteManyCart
};
