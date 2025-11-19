import Counselling from "../models/Counselling.js";

/* -------- Create new counselling booking -------- */
export const createCounselling = async (req, res) => {
  try {
    const counsellingData = req.body;

    console.log("Received counselling data:", counsellingData); // ✅ log here

    // Optional: attach logged-in user id if available
    if (req.user) counsellingData.userId = req.user._id;

    const newCounselling = new Counselling(counsellingData);
    await newCounselling.save();

    res.status(201).json({
      success: true,
      message: "Counselling session booked successfully",
      data: newCounselling,
    });
  } catch (error) {
    console.error("Error creating counselling:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create counselling booking",
      error: error.message,
    });
  }
};


/* -------- Get all counsellings (admin/debug) -------- */
export const getAllCounsellings = async (req, res) => {
  try {
    const counsellings = await Counselling.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: counsellings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* -------- Get counselling bookings for a specific user -------- */
export const getUserCounsellings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const counsellings = await Counselling.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: counsellings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
