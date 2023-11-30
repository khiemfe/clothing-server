const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouterr = require("./OrderRouterr");
const CartRouter = require("./CartRouter");
const PaymentRouter = require("./PaymentRouter");
const OTPRouter = require("./OTPRouter");
const base64ToImage = require("base64-to-image");
let { PythonShell } = require("python-shell");
// const sharp = require("sharp");
// const fs = require("fs");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/order", OrderRouterr);
  app.use("/api/cart", CartRouter);
  app.use("/api/payment", PaymentRouter);
  app.use("/api/otp", OTPRouter);

  app.post("/save", (req, res) => {
    // Nhận dữ liệu từ ReactJS
    const text = req.body.imageBase64;
    base64ToImage(text.toString(), "my_images");

    //   const imagee = "my_images/khiem.png";
    //   sharp(imagee)
    //     .png()
    //     .resize({
    //       fit: "contain",
    //       background: {
    //         r: 255,
    //         b: 255,
    //         g: 255,
    //       },
    //       position: "left",
    //     })
    //     // .extract({
    //     //   background: "red",
    //     // })
    //     // .fill({
    //     //   color: "#ffffff",
    //     // })
    //     .toFile("my_images2/img.jpeg")
    //     .then(function (newFileInfo) {
    //       console.log("SuccessImg2");
    //     })
    //     .catch(function (err) {
    //       console.log("Error occured ", err);
    //     });
  });

  app.get("/save", async (req, res) => {
    const imagee = "my_images/img.jpeg";
    const options = {
      pythonPath: "python3",
      args: [imagee],
    };
    PythonShell.run("model.py", options, function (err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log("results", results);
        res.json(results);
      }
    });
  });
};

module.exports = routes;
