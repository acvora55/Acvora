// controllers/recruitersController.js
import University from "../models/University.js";

// Upload recruiters logos
export const uploadRecruitersLogos = async (req, res) => {
  try {
    const { universityId } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    // Cloudinary / Multer-storage ne jo URLs diye hain unko extract karo
    const fileUrls = req.files.map((file) => file.path || file.location || file.url);

    // University dhundo
    const uni = await University.findById(universityId);
    if (!uni) {
      return res.status(404).json({ success: false, message: "University not found" });
    }

    // Push uploaded recruiter logos
    uni.recruitersLogos = [...uni.recruitersLogos, ...fileUrls];
    await uni.save();

    res.json({
      success: true,
      message: "Recruiter logos uploaded successfully",
      recruitersLogos: uni.recruitersLogos,
    });
  } catch (err) {
    console.error("❌ Error uploading recruiters logos:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
