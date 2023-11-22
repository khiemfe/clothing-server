const jwt = require("jsonwebtoken");
require("dotenv").config();

// const genneralAccessTokenAdmin = async (payload) => {
//   // console.log('pay', payload)
//   const access_token = jwt.sign(
//     {
//       ...payload,
//     },
//     process.env.ACCESS_TOKEN,
//     { expiresIn: "30s" }
//   );

//   return access_token;
// };

const genneralAccessToken = async (payload) => {
  // console.log('pay', payload)
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "2h" }
  );

  return access_token;
};

const genneralRefreshToken = async (payload) => {
  // console.log('pay', payload)
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "100d" }
  );

  return refresh_token;
};

const refreshTokenJwtService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("///////////", token);
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: "ERR",
            message: "The authemticationnn",
          });
        }
        console.log("??????????", user);
        let access_token;
        // if (user?.isAdmin) {
        //   access_token = await genneralAccessTokenAdmin({
        //     id: user?.id,
        //     isAdmin: user?.isAdmin,
        //   });
        // } else {
        access_token = await genneralAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });
        // }
        console.log("access_token ---------------", access_token);
        resolve({
          status: "OK",
          message: "SUCCESS",
          access_token,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  // genneralAccessTokenAdmin,
  genneralAccessToken,
  genneralRefreshToken,
  refreshTokenJwtService,
};
