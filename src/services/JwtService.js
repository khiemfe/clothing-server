const jwt = require("jsonwebtoken");
require("dotenv").config();

const genneralAccessTokenAdmin = async (payload) => {
  // console.log('pay', payload)
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "30s" }
  );

  return access_token;
};

const genneralAccessToken = async (payload) => {
  // console.log('pay', payload)
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "1d" }
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
    { expiresIn: "365d" }
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
        const access_token = await genneralAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });
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
  genneralAccessTokenAdmin,
  genneralAccessToken,
  genneralRefreshToken,
  refreshTokenJwtService,
};
