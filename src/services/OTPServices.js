const OTP = require("../models/OTPModel");
const EmailServices = require("./EmailServices");

const createOTP = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email } = newUser;
    console.log("email", email);
    try {
      // const checkUser = await User.findOne({
      //   email: email,
      // });
      // if (checkUser !== null) {
      //   resolve({
      //     status: "ERR",
      //     message: "The email is already",
      //   });
      // } else {
      // }
      const numbers = await EmailServices.sendEmailCreateUser(email);
      console.log("numbers", numbers);
      const createOTP = await OTP.create({
        email,
        otp: numbers,
      });
      if (createOTP) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createOTP,
        });
      }
    } catch (e) {
      reject({
        status: "ERR",
        message: "Loii",
      });
    }
  });
};

const deleteOTP = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await OTP.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      await OTP.deleteOne();
      resolve({
        status: "OK",
        message: "DELETE USER SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOTP,
  deleteOTP,
};
