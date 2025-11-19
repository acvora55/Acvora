import express from "express";
import Signup from "../models/Signup.js";

const router = express.Router();

// Helper to validate MongoDB ObjectId format
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// Get user profile by ID (Mongo _id or firebaseId)
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("📩 GET /api/profile/:id → Received ID:", userId); // Debug log

    let user;
    if (isValidObjectId(userId)) {
      // Try Mongo _id first
      user = await Signup.findById(userId).select("-password");
    } else {
      // Fallback: search by firebaseId
      user = await Signup.findOne({ firebaseId: userId }).select("-password");
    }

    if (!user) {
      console.log("❌ User not found for ID:", userId); // Debug log
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ Profile fetched successfully for ID:", userId); // Debug log
    res.json(user);
  } catch (err) {
    console.error("💥 GET Profile Error:", err.message); // Better error logging
    res.status(500).json({ message: "Server error" });
  }
});

// Update user profile by ID (Mongo _id or firebaseId)
router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    console.log("📝 PUT /api/profile/:id → Updating ID:", userId, "with data:", updateData); // Debug log

    let user;
    if (isValidObjectId(userId)) {
      // Try Mongo _id first
      user = await Signup.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select("-password");
    } else {
      // Fallback: update by firebaseId
      user = await Signup.findOneAndUpdate(
        { firebaseId: userId },
        { $set: updateData },
        { new: true, runValidators: true }
      ).select("-password");
    }

    if (!user) {
      console.log("❌ User not found for update on ID:", userId); // Debug log
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ Profile updated successfully for ID:", userId); // Debug log
    res.json(user);
  } catch (err) {
    console.error("💥 PUT Profile Error:", err.message); // Better error logging
    res.status(500).json({ message: "Server error" });
  }
});

export default router;