const cloudinary = require("../core/cloudinary_config");

const deleteImage = async (folder, public_id) => {
  await cloudinary.uploader.destroy(`${folder}/${public_id}`).catch((error) => {
    console.log(error);
  });
};

module.exports = deleteImage;
