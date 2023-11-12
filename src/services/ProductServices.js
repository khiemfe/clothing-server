const Product = require("../models/ProductModel");
// const bcrypt = require('bcrypt');
// const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, gender, price, age, size, type } = newProduct;
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
          gender,
          price,
          age,
          size,
          type,
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
      if (filter && filter.length == 2) {
        let allProductFilter;
        let allProductFilter1 = [];
        let allProductFilter2 = [];
        //   let allProductFilter3 = [];
        let allProductFilter4 = [];
        let noProduct;
        let totalProductSearch;
        let totalProductSearch2;

        const label = filter[0];
        console.log("limit", limit);

        // allProductFilter1 = await Product.find({
        //   [label]: { $regex: filter[1], $options: "i" },
        // })
        //   .limit(limit)
        //   .skip(page * limit);
        // for (let i = 0; i < allProductFilter1.length; i++) {
        //   allProductFilter4.push(allProductFilter1[i]);
        // }
        totalProductSearch2 = await Product.count({
          [label]: { $regex: filter[1]?.split(" ")[0], $options: "i" },
        });

        allProductFilter2 = await Product.find({
          [label]: { $regex: filter[1]?.split(" ")[0], $options: "i" },
        })
          .limit(limit)
          .skip(page * limit);

        if (filter[1].split(" ").length > 1) {
          for (let i = 0; i < allProductFilter2.length; i++) {
            const check = allProductFilter2[i]?.name
              .toLowerCase()
              .includes(filter[1]?.split(" ")[1].toLowerCase());
            // console.log("check", check);
            if (check) {
              allProductFilter4.push(allProductFilter2[i]);
              allProductFilter2.splice(i, 1);
            } else {
              noProduct = `Không có sản phẩm nào cho từ khoá: ${filter[1]}`;
            }
          }
        }
        // if (allProductFilter4.length === 0) {
        //   noProduct = `Không có sản phẩm nào cho từ khoá: ${filter[1]}`;
        // }

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
          //   for (let j = i + 1; j < allProductFilter.length; j++) {
          //     if (allProductFilter[i]?.id === allProductFilter[j]?.id) {
          //       allProductFilter.splice(j, 1);
          //     }
          //   }
          //   for (let j = 0; j < allProductFilter2.length; j++) {
          //     if (allProductFilter[i]?.id === allProductFilter2[j]?.id) {
          //       allProductFilter2.splice(j, 1);
          //     }
          //   }
          console.log("allProductFilter", allProductFilter[i]?.name);
        }

        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allProductFilter,
          data2: allProductFilter2,
          totalProduct: totalProductSearch,
          totalProduct2: totalProductSearch2,
          noProduct: noProduct || false,
          pageCurrent: page + 1,
          totalPage: Math.ceil(totalProductSearch / limit),
          totalPage2: Math.ceil(totalProductSearch2 / limit),
        });
      }

      //   -----

      let allProductFilterPropose;

      if (filter && filter.length == 6) {
        const label1 = filter[0];
        const label2 = filter[2];
        const label3 = filter[4];

        let label4 = filter[1];
        let label5 = filter[3];
        let label6 = filter[5];

        console.log("1", label4);
        console.log("2", label6);
        console.log("3", label5);

        const ageStart = +label5.split("-")[0];
        const ageEnd = +label5.split("-")[1];
        console.log("ageStart", ageStart);
        console.log("ageEnd", ageEnd);

        const arrAge = [];

        if (filter[1] === "nu") {
          label4 = "nữ";
        }
        if (filter[1] !== "nu" && filter[1] !== "nam") {
          label4 = "";
        }

        if (filter[5] === "Beo") {
          label6 = "Mập";
        }
        if (filter[5].toLowerCase() === "thuong") {
          label6 = "Bình thường";
        }
        if (filter[5] === "Om") {
          label6 = "Ốm";
        }
        if (
          filter[5] !== "Om" &&
          filter[5] !== "thuong" &&
          filter[5] !== "Beo"
        ) {
          label6 = "";
        }

        console.log("filter[1]", label4);
        console.log("filter[5]", label6);
        console.log("age", label5);

        let totalProductPropose;

        if (label5.includes("-")) {
          const gtAge = await Product.find({
            [label1]: { $regex: label4, $options: "i" },
            [label3]: { $regex: label6, $options: "i" },
          })
            .limit(limit)
            .skip(page * limit);

          console.log("limit", limit);
          for (let i = 0; i < gtAge.length; i++) {
            const ageProductStart = +gtAge[i]?.age?.split("-")[0];
            const ageProductEnd = +gtAge[i]?.age?.split("-")[1];
            if (
              ageStart === ageProductStart ||
              ageStart === ageProductEnd ||
              ageEnd === ageProductStart ||
              ageEnd === ageProductEnd ||
              (ageStart < ageProductStart && ageEnd > ageProductStart) ||
              (ageProductEnd > ageStart && ageStart > ageProductStart)
            ) {
              arrAge.push(gtAge[i]?.age);
            }
          }
          console.log("arrAge", arrAge);

          totalProductPropose = await Product.count({
            [label2]: { $in: arrAge },
          });

          allProductFilterPropose = await Product.find({
            [label2]: { $in: arrAge },
          })
            .limit(limit)
            .skip(page * limit);
        } else {
          allProductFilterPropose = await Product.find({
            [label1]: { $regex: label4, $options: "i" },
            [label3]: { $regex: label6, $options: "i" },
          })
            .limit(limit)
            .skip(page * limit);

          totalProductPropose = await Product.count({
            [label1]: { $regex: label4, $options: "i" },
            [label3]: { $regex: label6, $options: "i" },
          });
        }

        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allProductFilterPropose,
          totalProduct: totalProductPropose,
          pageCurrent: page + 1,
          totalPage: Math.ceil(totalProductPropose / limit),
        });
      }

      //   -------

      const totalProductAll = await Product.count();

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
          totalProduct: totalProductAll,
          pageCurrent: page + 1,
          totalPage: Math.ceil(totalProductAll / limit),
        });
      }

      //   ------

      const allProduct = await Product.find()
        .limit(limit)
        .skip(page * limit);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allProduct,
        totalProduct: totalProductAll,
        pageCurrent: page + 1,
        totalPage: Math.ceil(totalProductAll / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Product.distinct("type");
      resolve({
        status: "OK",
        message: "GET ALL TYPE SUCCESS",
        data: allType,
      });
    } catch (e) {
      console.log("loi All type", e);
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
  getAllType,
};
