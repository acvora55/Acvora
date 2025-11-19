import express from "express";
import multer from "multer";
import { uploadCutoffExcel } from "../controllers/cutoffController.js";
import UniversityRegistration from "../models/University.js"; // ✅ fix import

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// 📌 Upload cutoff Excel for a university
router.post("/:universityId/cutoff/upload", upload.single("file"), uploadCutoffExcel);

// 📌 Get cutoff data for a university
router.get("/:universityId/cutoffs", async (req, res) => {
  try {
    const uni = await UniversityRegistration.findById(req.params.universityId);
    if (!uni) {
      return res.status(404).json({ success: false, message: "University not found" });
    }

    res.json({ success: true, cutoffs: uni.cutoffs });
  } catch (err) {
    console.error("Error fetching cutoffs:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
