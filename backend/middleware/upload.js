const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "skillmart_courses",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;