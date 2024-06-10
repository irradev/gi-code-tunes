const cloudinary = require('cloudinary').v2;
const randomstring = require('randomstring');

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // al estar en localhost puede causar problemas
});

const uploadFile = async (file) => {
  const options = {
    folder: 'clon-spotify',
    public_id: randomstring.generate(15),
    resource_type: 'auto',
    // use_filename: true,
    // unique_filename: false,
    // overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const deleteFile = async (public_id) => {
  return await cloudinary.uploader.destroy(public_id);
};

module.exports = { uploadFile, deleteFile };
