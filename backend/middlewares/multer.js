import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "students"; // default folder
    if (file.fieldname === "photo") folder = "students/photos";
    if (file.fieldname === "marksheet") folder = "students/marksheets";
    if (file.fieldname === "tc") folder = "students/tc";
    if (file.fieldname === "migration") folder = "students/migration";
    if (file.fieldname === "idProof") folder = "students/idproof";
    if (file.fieldname === "paymentReceipt") folder = "students/payment";

    return {
      folder,
      resource_type: "auto", // handles images, pdfs, etc.
      public_id: `${file.fieldname}-${Date.now()}`,
    };
  },
});

const upload = multer({ storage });

export default upload;
