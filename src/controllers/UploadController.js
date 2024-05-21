const cloudinary = require("../configs/cloudinaryConfig");

const uploadImages = async (req, res) => {
  try {
    const images = req.body.images;
    const uploadImages = [];
    for (let image of images) {
      const results = await cloudinary.uploader.upload(image, {
        folder: "five-man",
        format: "jpg",
      });
      uploadImages.push({
        url: results.secure_url,
        publicId: results.public_id,
      });
    }
    return res.status(200).json({
      message: "Upload Images Successfully!",
      data: uploadImages,
    });
  } catch (e) {
    return res.status(404).json({
      message: "Upload Images Failed!",
      name: e.name,
    });
  }
};

module.exports = {
  uploadImages,
};
