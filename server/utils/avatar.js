const cloudinary = require("./cloudinary");

const uploadImage = async (imagePath) => {
  const result = await cloudinary.uploader.upload(imagePath, {
    folder: "mern_avatar_images",
  });

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

module.exports = uploadImage;