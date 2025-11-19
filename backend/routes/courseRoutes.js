import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { createCourse, getCourses, getCourseById } from "../controllers/courseController.js";

const router = express.Router();

// ✅ Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // ✅ Limit: 10MB per file
});

// ✅ Multiple image fields config
const cpUpload = upload.fields([
  { name: "specializationImages", maxCount: 10 },
  { name: "topInstituteImages", maxCount: 10 },
]);

// ✅ Routes
router.post("/", cpUpload, createCourse); // Create new course with image upload
router.get("/", getCourses);              // Get all courses
router.get("/:id", getCourseById);        // Get course by ID

export default router;
