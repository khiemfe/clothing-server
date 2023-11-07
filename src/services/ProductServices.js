const Product = require("../models/ProductModel");
// const bcrypt = require('bcrypt');
// const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, age, bmi } = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "ERR",
          message: "The name of product is already",
        });
      } else {
        const createProduct = await Product.create({
          name,
          image,
          type,
          price,
          age,
          bmi,
        });
        if (createProduct) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: createProduct,
          });
        }
      }
    } catch (e) {
      resolve({
        status: "ERROR SERVICE",
      });
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }

      const updateProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        updateProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
      });
      if (product === null) {
        resolve({
          status: "ERR",
          message: "The product is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      await Product.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "DELETE PRODUCT SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyProduct = (ids) => {
  console.log("ids", ids);
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "DELETE MANY PRODUCT SUCCESS",
      });
    } catch (e) {
      console.log("loi", e);
    }
  });
};

const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let totalProduct;
      let allProductFilter;
      let allProductFilter1 = [];
      let allProductFilter2 = [];
      let allProductFilter3 = [];
      let allProductFilter4 = [];
      let noProduct;
      if (filter && filter.length == 2) {
        const label = filter[0];
        console.log("limit", limit);
        totalProduct = await Product.count({
          [label]: { $regex: filter[1], $options: "i" },
        });
        allProductFilter1 = await Product.find({
          [label]: { $regex: filter[1], $options: "i" },
        })
          .limit(limit)
          .skip(page * limit);
        for (let i = 0; i < allProductFilter1.length; i++) {
          allProductFilter4.push(allProductFilter1[i]);
        }
        totalProduct += await Product.count({
          [label]: { $regex: filter[1], $options: "i" },
        });
        allProductFilter2 = await Product.find({
          [label]: { $regex: filter[1].split(" ")[0], $options: "i" },
        })
          .limit(limit)
          .skip(page * limit);

        for (let i = 0; i < allProductFilter2.length; i++) {
          const check = allProductFilter2[i]?.name.includes(
            filter[1].split(" ")[1]
          );
          console.log("check", check);
          if (check) {
            allProductFilter4.push(allProductFilter2[i]);
            allProductFilter2.splice(i, 1);
          } else {
            noProduct = `Không có sản phẩm nào cho từ khoá: ${filter[1]}`;
          }
        }
        for (let i = 0; i < allProductFilter2.length; i++) {
          allProductFilter4.push(allProductFilter2[i]);
        }

        // if (filter[1]?.split(" ")[1]) {
        //   allProductFilter3 = await Product.find({
        //     [label]: { $regex: filter[1]?.split(" ")[1], $options: "i" },
        //   });
        //   console.log("allProductFilter3", allProductFilter3);
        //   for (let i = 0; i < allProductFilter3.length; i++) {
        //     const check = allProductFilter3[i]?.name.includes(
        //       filter[1].split(" ")[1]
        //     );
        //     console.log("check2", check);
        //     if (check) {
        //       allProductFilter4.push(allProductFilter3[i]);
        //       allProductFilter3.splice(i, 1);
        //     }
        //   }
        //   for (let i = 0; i < allProductFilter3.length; i++) {
        //     console.log("allProductFilter3", allProductFilter3[i]?.name);
        //     allProductFilter4.push(allProductFilter3[i]);
        //   }
        // }

        allProductFilter = allProductFilter4;

        for (let i = 0; i < allProductFilter.length; i++) {
          for (let j = i + 1; j < allProductFilter.length; j++) {
            if (allProductFilter[i]?.id === allProductFilter[j]?.id) {
              allProductFilter.splice(j, 1);
            }
          }
        }
        for (let i = 0; i < allProductFilter.length; i++) {
          console.log("allProductFilter", allProductFilter[i]?.name);
        }
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allProductFilter,
          totalProduct: totalProduct / 2,
          noProduct: noProduct || false,
          pageCurrent: page + 1,
          totalPage: Math.ceil(totalProduct / 2 / limit),
        });
      } 
      if (sort && sort.length == 2) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allProductSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allProductSort,
          totalProduct: totalProduct,
          pageCurrent: page + 1,
          totalPage: Math.ceil(totalProduct / limit),
        });
      }

      const allProduct = await Product.find()
        .limit(limit)
        .skip(page * limit);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allProduct,
        totalProduct: totalProduct,
        pageCurrent: page + 1,
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  deleteManyProduct,
};
