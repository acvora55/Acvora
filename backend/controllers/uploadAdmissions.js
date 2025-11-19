import xlsx from "xlsx";
import fs from "fs";
import UniversityRegistration from "../models/University.js";

export const uploadAdmissions = async (req, res) => {
  try {
    const { universityId } = req.params;
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Excel read
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Map Excel rows -> DB format
    const admissions = rows.map((row) => ({
      courseName: row["Course Name"] || "",
      eligibility: row["Eligibility"] || "",
      specialization: row["Specialization"] || "",
      fee: row["Fee"] || "",
      highestPack: row["Highest Pack"] || "",
      avgPack: row["Avg Package"] || "",
    }));

    // Save into DB
    const university = await UniversityRegistration.findById(universityId);
    if (!university) {
      return res.status(404).json({ success: false, message: "University not found" });
    }

    university.admissions = admissions; // overwrite old data
    await university.save();

    fs.unlinkSync(req.file.path); // cleanup
    res.json({ success: true, message: "Admissions uploaded successfully", admissions });
  } catch (err) {
    console.error("❌ Error uploading admissions:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
