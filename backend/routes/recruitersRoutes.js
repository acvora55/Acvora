// routes/recruitersRoutes.js
import express from "express";
import multer from "multer";
import { uploadRecruitersLogos } from "../controllers/recruitersController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// 📌 Upload recruiter logos
router.post("/:universityId/recruiters/upload", upload.array("recruitersLogos", 10), uploadRecruitersLogos);

// 📌 Get recruiters logos
router.get("/:universityId/recruiters", async (req, res) => {
  try {
    const uni = await University.findById(req.params.universityId);
    if (!uni) {
      return res.status(404).json({ success: false, message: "University not found" });
    }
    res.json({ success: true, recruitersLogos: uni.recruitersLogos });
  } catch (err) {
    console.error("Error fetching recruiters logos:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
