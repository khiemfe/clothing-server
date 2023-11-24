const Cart = require("../models/CartModel");

const createCart = (userId, data) => {
  return new Promise(async (resolve, reject) => {
    const { name, amount, size, image, price } = data;
    console.log('data', data)
    try {
      const checkCart = await Cart.findOne({
        userId: userId,
        name: name,
        size: size,
      });
      if (checkCart !== null) {
        const dataUpdate = {
          amount: amount + checkCart.amount,
        };
        const updateCart = await Cart.findByIdAndUpdate(
          checkCart._id,
          dataUpdate,
          {
            new: true,
          }
        );

        resolve({
          status: "OK",
          message: "SUCCESS",
          updateCart,
        });
      } else {
        const createCart = await Cart.create({
          name,
          amount,
          size,
          image,
          price,
          userId,
        });
        if (createCart) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: createCart,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllCart = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await Cart.find({
        userId: id,
      }).sort({ createdAt: -1, updatedAt: -1 });
      if (cart === null) {
        resolve({
          status: "ERR",
          message: "The cart is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: cart,
      });
    } catch (e) {
      // console.log('e', e)
      reject(e);
    }
  });
};

// const getOrderDetails = (id) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const order = await Order.findById({
//         _id: id,
//       });
//       if (order === null) {
//         resolve({
//           status: "ERR",
//           message: "The order is not defined",
//         });
//       }

//       resolve({
//         status: "OK",
//         message: "SUCESSS",
//         data: order,
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

const deleteCart = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkCart = await Cart.findOne({
        _id: id,
      });
      console.log('checkCart', checkCart)
      if (checkCart === null) {
        resolve({
          status: "ERR",
          message: "The cart is not defined",
        });
      }
      await Cart.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "DELETE PRODUCT SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyCart = (ids) => {
  console.log("ids", ids);
  return new Promise(async (resolve, reject) => {
    try {
      await Cart.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "DELETE MANY PRODUCT SUCCESS",
      });
    } catch (e) {
      console.log("loi", e);
    }
  });
};

module.exports = {
  createCart,
  getAllCart,
  // getOrderDetails,
  deleteCart,
  deleteManyCart
};
