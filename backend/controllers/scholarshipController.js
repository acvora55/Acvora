import Scholarship from "../models/Scholarship.js";

// Get all scholarships (global, existing)
export const getScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find()
      .populate("universityId", "instituteName city state logo"); 
      // 👆 You can include more fields if you want (city, logo, etc.)

    res.status(200).json(scholarships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a scholarship (global, existing)
export const addScholarship = async (req, res) => {
  try {
    const scholarship = new Scholarship(req.body);
    await scholarship.save();
    res.status(201).json(scholarship);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a scholarship (global, existing)
export const deleteScholarship = async (req, res) => {
  try {
    const deleted = await Scholarship.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Scholarship not found" });
    }
    res.json({ message: "Scholarship deleted successfully" });
  } catch (err) {
    console.error("Error deleting scholarship:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get all scholarships for a university
export const getScholarshipsByUniversity = async (req, res) => {
  try {
    const { id } = req.params; // universityId
    const scholarships = await Scholarship.find({ universityId: id });
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a scholarship for a university
export const addScholarshipToUniversity = async (req, res) => {
  try {
    const { id } = req.params; // universityId
    const newScholarship = new Scholarship({ ...req.body, universityId: id });
    await newScholarship.save();
    res.status(201).json(newScholarship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a scholarship by ID (scoped to university)
export const deleteScholarshipFromUniversity = async (req, res) => {
  try {
    const { id, scholarshipId } = req.params;
    const deleted = await Scholarship.findOneAndDelete({
      _id: scholarshipId,
      universityId: id,
    });
    if (!deleted) return res.status(404).json({ error: "Scholarship not found" });
    res.json({ message: "Scholarship deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
