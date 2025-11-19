// controllers/placementsController.js
import xlsx from "xlsx";
import University from "../models/University.js";

// Upload placements excel
export const uploadPlacementsExcel = async (req, res) => {
  try {
    const { universityId } = req.params;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Excel read karo
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Format -> placements array
    const placements = data.map((row) => ({
      year: row.Year || "",
      companies: row.Companies || "",
      placed: row.Placed || "",
      highestCTC: row["Highest CTC"] || "",
      avgCTC: row["Avg CTC"] || "",
    }));

    // University update
    const uni = await University.findById(universityId);
    if (!uni) {
      return res.status(404).json({ success: false, message: "University not found" });
    }

    uni.placements = placements;
    await uni.save();

    res.json({
      success: true,
      message: "Placements uploaded successfully",
      placements: uni.placements,
    });
  } catch (err) {
    console.error("❌ Error uploading placements:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
