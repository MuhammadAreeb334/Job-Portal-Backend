import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (
  fileBuffer,
  folder,
  resourceType = "image",
  filename = "",
) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        use_filename: true,
        unique_filename: true,
        filename_override: filename,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

export default uploadToCloudinary;
