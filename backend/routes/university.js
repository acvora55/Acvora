// backend/routes/universities.js
import express from "express";
import University from "../models/University.js";
import { uploadCoursesExcel } from "../controllers/uploadController.js";
import multer from "multer";
import path from "path";

const router = express.Router();

/* ✅ Multer DiskStorage Setup */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder jaha file save hogi
  },
  filename: function (req, file, cb) {
    // unique filename (date + extension)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Get all universities
router.get("/", async (req, res) => {
  try {
    const universities = await University.find(); // <-- uses University model
    res.json({ success: true, data: universities });
  } catch (err) {
    console.error("Error fetching universities:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});


/* ✅ Get university by ID */
router.get("/:id", async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    res.json(university);
  } catch (err) {
    console.error("Error fetching university:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ✅ Upload & parse courses Excel */
// Form field name must be: "file"
router.post(
  "/:universityId/courses/upload",
  upload.single("file"),
  uploadCoursesExcel
);

// backend/routes/universityRegistration.js
router.post(
  "/",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "bannerImage", maxCount: 10 },
    { name: "aboutImages", maxCount: 10 },
    { name: "accreditationDoc", maxCount: 5 },
    { name: "affiliationDoc", maxCount: 5 },
    { name: "registrationDoc", maxCount: 5 },
    { name: "videos", maxCount: 10 },
    { name: "infraPhotos", maxCount: 20 },
    { name: "eventPhotos", maxCount: 20 },
    { name: "galleryImages", maxCount: 20 },
    { name: "recruitersLogos", maxCount: 20 },
  ]),
  async (req, res) => {
    try {
      // text fields
      const uniData = { ...req.body };

      // handle file fields
      const fileFields = [
        "logo",
        "bannerImage",
        "aboutImages",
        "accreditationDoc",
        "affiliationDoc",
        "registrationDoc",
        "videos",
        "recruitersLogos",
      ];

      fileFields.forEach((field) => {
        if (req.files[field]) {
          uniData[field] = req.files[field].map(
            (f) => `/uploads/${f.filename}`
          );
        }
      });

      // gallery special handling
      uniData.gallery = {
        infraPhotos: req.files["infraPhotos"]?.map((f) => `/uploads/${f.filename}`) || [],
        eventPhotos: req.files["eventPhotos"]?.map((f) => `/uploads/${f.filename}`) || [],
        otherPhotos: req.files["galleryImages"]?.map((f) => `/uploads/${f.filename}`) || [],
      };

      const newUni = await University.create(uniData);
      res.json({ success: true, data: newUni });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* ✅ Get all courses of a university */
// Endpoint: GET /api/universities/:id/courses
router.get("/:id/courses", async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    res.json({ success: true, courses: university.courses });
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});



// ✅ Get one university by ID
router.get("/:id", async (req, res) => {
  try {
    const uni = await UniversityRegistration.findById(req.params.id);
    if (!uni) return res.status(404).json({ success: false, message: "University not found" });
    res.json({ success: true, data: uni });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Update university by ID
router.put("/:id", async (req, res) => {
  try {
    const uni = await UniversityRegistration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!uni) return res.status(404).json({ success: false, message: "University not found" });
    res.json({ success: true, data: uni });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Delete university by ID
router.delete("/:id", async (req, res) => {
  try {
    const uni = await UniversityRegistration.findByIdAndDelete(req.params.id);
    if (!uni) return res.status(404).json({ success: false, message: "University not found" });
    res.json({ success: true, message: "University deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;


