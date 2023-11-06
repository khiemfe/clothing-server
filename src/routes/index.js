const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const base64ToImage = require("base64-to-image");
let { PythonShell } = require("python-shell");
// const sharp = require("sharp");
// const fs = require("fs");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);

  app.post("/save", (req, res) => {
    // Nhận dữ liệu từ ReactJS
    const text = req.body.imageBase64;
    base64ToImage(text.toString(), "my_images/");

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
    let options = {
      pythonPath: "python3",
      args: [imagee],
    };
    PythonShell.run("model.py", options, function (err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
        res.json(results);
      }
    });
  });
};

module.exports = routes;
