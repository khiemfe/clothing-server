const express = require("express");
const router = express.Router();
const base64ToImage = require("base64-to-image");

router.post("/proposed", (req, res) => {
  const text = req.body.imageBase64;
  base64ToImage(text.toString(), "my_images");
});
module.exports = router;
