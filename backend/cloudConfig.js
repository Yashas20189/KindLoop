const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config({ path: '../.env' });

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Storage setup for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'KindLoop_DEV',
    allowed_formats: ['png', 'jpg', 'jpeg'], // ✅ correct key is `allowed_formats` (not `allowedFormats`)
  },
});

module.exports = {
  cloudinary,
  storage,
};
