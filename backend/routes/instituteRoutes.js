import express from "express";
import Institute from "../models/Institute.js";

const router = express.Router();

// POST /api/institutes → Add new institute
router.post("/", async (req, res) => {
  try {
    const { name, location, courses, commission } = req.body;

    if (!name || !location || !courses || commission === undefined) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newInstitute = new Institute({
      name,
      location,
      courses: Array.isArray(courses) ? courses : courses.split(",").map(c => c.trim()),
      commission: parseFloat(commission),
    });

    await newInstitute.save();
    res.status(201).json({ success: true, institute: newInstitute });
  } catch (err) {
    console.error("❌ Error saving institute:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET /api/institutes → List all institutes
router.get("/", async (req, res) => {
  try {
    const institutes = await Institute.find().sort({ name: 1 });
    res.json({ success: true, institutes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
