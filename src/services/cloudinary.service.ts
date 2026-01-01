import cloudinary from "../config/cloudinary";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const validateImage = (file: Express.Multer.File) => {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
        throw new Error("Invalid file type. Only PNG and JPEG images are allowed.");
    }

    if (file.size > MAX_FILE_SIZE) {
        throw new Error("File size exceeds 5MB limit.");
    }
};

export const uploadImage = async (file: Express.Multer.File): Promise<string> => {
    validateImage(file);

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "donations",
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(new Error("Failed to upload image to Cloudinary"));
                } else if (result) {
                    resolve(result.secure_url);
                }
            }
        );

        uploadStream.end(file.buffer);
    });
};
