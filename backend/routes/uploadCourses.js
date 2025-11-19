// backend/routes/uploadCourses.js
import express from "express";
import multer from "multer";
import xlsx from "xlsx";
import UniversityRegistration from "../models/University.js";

const router = express.Router();

// Multer setup - store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ---------------- Upload courses Excel ---------------- */
router.post("/upload-courses/:id", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Parse Excel
    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    // Map Excel rows to schema fields
    const courses = jsonData.map((row, index) => ({
      courseName: row["courseName"] || row["Course Name"] || `Course ${index + 1}`,
      duration: row["duration"] || row["Duration"] || "",
      totalFees: row["totalFees"] || row["Total Fees"] || "",
      yearlyFees: row["yearlyFees"] || row["Yearly Fees"] || "",
      intake: row["intake"] || row["Intake"] || "",
      applyLink: row["applyLink"] || row["Apply Link"] || "",
    }));

    console.log("✅ Parsed courses:", courses);

    // Update University by ID
    const updatedUniversity = await UniversityRegistration.findByIdAndUpdate(
      req.params.id,
      {
        $set: { courses }, // overwrite old courses
        $push: { courseFiles: file.originalname }, // track uploaded file
      },
      { new: true, runValidators: true }
    );

    if (!updatedUniversity) {
      return res.status(404).json({ error: "University not found" });
    }

    res.json({
      success: true,
      message: "Courses uploaded successfully",
      courses: updatedUniversity.courses,
    });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({
      error: "Failed to upload courses",
      details: err.message,
    });
  }
});

/* ---------------- Get courses for a university ---------------- */
router.get("/:id/courses", async (req, res) => {
  try {
    const university = await UniversityRegistration.findById(req.params.id).select("courses");
    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }
    res.json({ success: true, courses: university.courses || [] });
  } catch (err) {
    console.error("❌ Error fetching courses:", err);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});


export default router;
