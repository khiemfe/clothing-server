const express = require("express");
const router = express.Router();
const base64ToImage = require("base64-to-image");

router.post("/proposed", (req, res) => {
  try {
    const text = req.body.imageBase64;
    base64ToImage(text.toString(), "my_images");
    return res.status(200).json({
      status: "OK",
      message: "Chay ok vao day",
    });
  } catch {
    return res.status(404).json({
      message: "loi img",
    });
  }
});
module.exports = router;
