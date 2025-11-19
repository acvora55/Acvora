import XLSX from "xlsx";
import UniversityRegistration from "../models/University.js"; // ✅ fix import

/**
 * Upload & parse cutoff Excel
 */
export const uploadCutoffExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Read uploaded Excel file
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0]; // first sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // Format data into your schema (course, open, general, ews, obc, sc, st, pwd)
    const cutoffs = jsonData.map((row) => ({
      course: row["Course"] || row["course"] || "",
      open: row["Open"] || row["open"] || "-",
      general: row["General"] || row["general"] || "-",
      ews: row["EWS"] || row["ews"] || "-",
      obc: row["OBC"] || row["obc"] || "-",
      sc: row["SC"] || row["sc"] || "-",
      st: row["ST"] || row["st"] || "-",
      pwd: row["PWD"] || row["pwd"] || "-",
    }));

    // Save into DB
    const uni = await UniversityRegistration.findById(req.params.universityId);
    if (!uni) {
      return res.status(404).json({ success: false, message: "University not found" });
    }

    uni.cutoffs = cutoffs;
    await uni.save();

    return res.json({
      success: true,
      message: "Cutoff data uploaded successfully",
      cutoffs,
    });

  } catch (err) {
    console.error("Error uploading cutoff Excel:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
