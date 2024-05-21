const express = require("express");
const { uploadImages } = require("../controllers/UploadController");
const routerImage = express.Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../configs/cloudinaryConfig");
const multer = require("multer");

const storage = new CloudinaryStorage({
  cloudinary,
  // params: {
  //   folder: "five-man",
  //   format: "jpg",
  // },
});

const upload = multer({ storage });

routerImage.post("/upload", upload.array("images", 4), uploadImages);

module.exports = routerImage;
