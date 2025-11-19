// routes/placementsRoutes.js
import express from "express";
import multer from "multer";
import { uploadPlacementsExcel } from "../controllers/placementsController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Excel upload route
router.post("/:universityId/placements/upload", upload.single("file"), uploadPlacementsExcel);

export default router;
