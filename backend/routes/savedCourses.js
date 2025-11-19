// routes/savedCourses.js
import express from "express";
import Signup from "../models/Signup.js";  // Adjust path if your models folder is different

const router = express.Router();

// GET saved courses
router.get("/:userId", async (req, res) => {
  try {
    const user = await Signup.findOne({ firebaseId: req.params.userId }).select("savedCourses");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.savedCourses || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// POST add a saved course
router.post("/:userId", async (req, res) => {
  try {
    const { courseId, courseTitle, eligibility } = req.body;
    if (!courseId || !courseTitle) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await Signup.findOne({ firebaseId: req.params.userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Avoid duplicates
    if (!user.savedCourses.some(c => c.courseId === courseId)) {
      user.savedCourses.push({ courseId, courseTitle, eligibility });
      await user.save();
    }
    res.json(user.savedCourses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE remove a saved course
router.delete("/:userId/:courseId", async (req, res) => {
  try {
    const user = await Signup.findOne({ firebaseId: req.params.userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.savedCourses = user.savedCourses.filter(
      c => c.courseId !== req.params.courseId
    );
    await user.save();
    res.json(user.savedCourses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});


export default router;