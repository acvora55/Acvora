import XLSX from "xlsx";
import University from "../models/University.js";

/* ---------------- Upload Courses & Fees Excel ---------------- */
export const uploadCoursesExcel = async (req, res) => {
  try {
    console.log("📂 File received:", req.file);
    console.log("🏫 University ID:", req.params.universityId);

    const { universityId } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    if (!universityId) {
      return res.status(400).json({ error: "University ID is required" });
    }

    // ✅ File path
    const filePath = req.file.path;

    // ✅ Parse Excel
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    let data = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    console.log("📊 Raw Excel Data:", data);

    // ✅ Clean fees
    const cleanValue = (val) =>
      typeof val === "string"
        ? val.replace(/â‚¹/g, "₹").replace(/[^\d₹,]/g, "").trim()
        : val;

    // ✅ Map Excel columns to schema fields
    const courses = data.map((row) => ({
      courseName: row["Course Name"] || "",
      totalFees: cleanValue(row["Total Fees"]) || "",
      yearlyFees: cleanValue(row["Yearly Fees"]) || "",
      duration: row["Duration"] || "",
      intake: row["Intake"] || "",
      applyLink: row["Apply Link"] || "",
    }));

    console.log("✅ Parsed Courses:", courses);

    // ✅ Save in DB
    const university = await University.findByIdAndUpdate(
      universityId,
      {
        $set: {
          courseFiles: [filePath], // uploaded Excel ka path
          courses, // parsed courses array
        },
      },
      { new: true }
    );

    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    res.json({
      success: true,
      message: "Courses uploaded & parsed successfully",
      courses: university.courses,
    });
  } catch (err) {
    console.error("❌ Error parsing Excel:", err);
    res.status(500).json({ error: "Failed to upload courses file" });
  }
};
