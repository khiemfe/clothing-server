const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      phone,
      user,
    } = newOrder;
    try {
      const promises = orderItems?.map(async (order) => {
        console.log("orderSize", order?.size);
        const quantityProperty = `quantity.size${order?.size}`;
        const productData = await Product.findOneAndUpdate(
          {
            _id: order?.product,
            [quantityProperty]: { $gte: order?.amount }, //ktra xem còn đủ sl không
          },
          {
            $inc: {
              [quantityProperty]: -order?.amount, //cập nhật lại sl size
              selled: +order?.amount, //cập nhật lại sl đã bán
            },
          },
          { new: true } //trả về dữ liệu mới sau khi cập nhật
        );
        if (productData) {
          if (createOrder) {
            return {
              status: "OK",
              message: "SUCCESS",
            };
          }
        } else {
          return {
            message: "Không có đủ sản phẩm",
            id: order?.product,
          };
        }
      });
      const results = await Promise.all(promises);
      console.log("results", results);
      const newData = results.filter((item) => item.id);
      if (newData.length) {
        const arrId = [];
        newData.forEach((item) => {
          arrId.push(item.id);
        });
        resolve({
          status: "ERR",
          message: `San pham voi id: ${arrId.join(",")} khong du hang`,
        });
      } else {
        const createOrder = await Order.create({
          orderItems,
          shippingAddres: {
            fullName,
            phone,
            address,
          },
          paymentMethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
          user,
        });
        if (createOrder) {
          resolve({
            status: "OK",
            message: "success",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({
        user: id,
      }).sort({ createdAt: -1, updatedAt: -1 });
      if (order === null) {
        resolve({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: order,
      });
    } catch (e) {
      // console.log('e', e)
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
  getAllOrderDetails,
};
