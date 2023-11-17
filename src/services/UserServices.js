const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const {
  // genneralAccessTokenAdmin,
  genneralAccessToken,
  genneralRefreshToken,
} = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({
          status: "ERR",
          message: "The email is already",
        });
      } else {
        const hash = bcrypt.hashSync(password.toString(), 10);
        const createUser = await User.create({
          name,
          email,
          password: hash,
          confirmPassword,
          phone,
        });
        if (createUser) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: createUser,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      //  console.log(typeof password.toString())
      //  console.log(typeof checkUser.password)
      // console.log(password.toString() === checkUser.password)
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      console.log("pass", comparePassword);
      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The password or user in incorrect",
        });
      }

      console.log("checkUser.isAdmin", checkUser.isAdmin);
      let access_token
      // if (checkUser.isAdmin) {
      //   access_token = await genneralAccessTokenAdmin({
      //     id: checkUser.id,
      //     isAdmin: checkUser.isAdmin,
      //   });
      // } else {
        access_token = await genneralAccessToken({
          id: checkUser.id,
          isAdmin: checkUser.isAdmin,
        });
      // }

      console.log("++++++++", access_token);

      // console.log(access_token)
      console.log(checkUser.id);
      console.log(checkUser.isAdmin);
      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      console.log("=========", refresh_token);

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  console.log('iddddd', id)
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      //  console.log('checkUser', checkUser)
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
      // console.log('updateUser', updateUser)

      resolve({
        status: "OK",
        message: "SUCCESS",
        updateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      //  console.log('checkUser', checkUser)
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }

      await User.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "DELETE USER SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyUser = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "DELETE MANY USER SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsUser = (id) => {
  console.log('id id', id)
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (user === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  deleteManyUser,
};
