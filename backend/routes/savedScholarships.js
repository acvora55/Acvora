import express from "express";
import Signup from "../models/Signup.js";

const router = express.Router();

// Get all saved scholarships for a user
router.get("/:userId", async (req, res) => {
  try {
    const user = await Signup.findOne({ firebaseId: req.params.userId }).populate("savedScholarships");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, savedScholarships: user.savedScholarships || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Save a scholarship
router.post("/:userId/:scholarshipId", async (req, res) => {
  try {
    const user = await Signup.findOne({ firebaseId: req.params.userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const scholarshipId = req.params.scholarshipId;

    if (!user.savedScholarships.includes(scholarshipId)) {
      user.savedScholarships.push(scholarshipId);
      await user.save();
    }

    const updatedUser = await Signup.findOne({ firebaseId: req.params.userId }).populate("savedScholarships");
    res.json({ success: true, savedScholarships: updatedUser.savedScholarships || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove a scholarship
router.delete("/:userId/:scholarshipId", async (req, res) => {
  try {
    const user = await Signup.findOne({ firebaseId: req.params.userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const scholarshipId = req.params.scholarshipId;
    user.savedScholarships = user.savedScholarships.filter(
      (id) => id.toString() !== scholarshipId
    );
    await user.save();

    const updatedUser = await Signup.findOne({ firebaseId: req.params.userId }).populate("savedScholarships");
    res.json({ success: true, savedScholarships: updatedUser.savedScholarships || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
