import cloudinary from "cloudinary";
import fs from "fs/promises";

const cloudinaryUpload = async (files) => {
  const fileUrl = [];

  for (let file of files.avatar) {
    let result;
    try {
      result = await cloudinary.v2uploader.upload(file.path, {
        folder: "techup/demo",
        private: true,
      });
    } catch (error) {
      console.log("error:", error);
    }

    fileUrl.push({
      url: result.secure_url,
      publicId: result.public_id,
    });
    await fs.unlink(file.path);
  }
  return fileUrl;
};

export { cloudinaryUpload };
