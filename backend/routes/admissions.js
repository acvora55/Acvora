import express from "express";
import multer from "multer";
import { uploadAdmissions } from "../controllers/uploadAdmissions.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/:universityId/admissions/upload", upload.single("file"), uploadAdmissions);

export default router;
