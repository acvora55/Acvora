import University from "../models/University.js";

export const uploadDocs = async (req, res) => {
  try {
    const { universityId } = req.params;
    const uni = await University.findById(universityId);

    if (!uni) {
      return res.status(404).json({ success: false, message: "University not found" });
    }

    // Initialize docs if undefined
    if (!uni.docs) {
      uni.docs = {
        accreditationDoc: [],
        affiliationDoc: [],
        registrationDoc: [],
        videos: [],
        courseFiles: [],
      };
    }

    const mapFiles = (field) =>
      req.files[field]?.map((f) => f.path.replace(/\\/g, "/")) || [];

    uni.docs.accreditationDoc.push(...mapFiles("accreditationDoc"));
    uni.docs.affiliationDoc.push(...mapFiles("affiliationDoc"));
    uni.docs.registrationDoc.push(...mapFiles("registrationDoc"));
    uni.docs.videos.push(...mapFiles("videos"));
    uni.docs.courseFiles.push(...mapFiles("courseFiles"));

    await uni.save();

    res.json({
      success: true,
      message: "Docs uploaded successfully",
      docs: uni.docs,
    });
  } catch (err) {
    console.error("❌ Error uploading docs:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get Docs (optional, to fetch in frontend)
export const getDocs = async (req, res) => {
  try {
    const { universityId } = req.params;
    const uni = await University.findById(universityId);

    if (!uni) {
      return res
        .status(404)
        .json({ success: false, message: "University not found" });
    }

    res.json({
      success: true,
      docs: uni.docs,
    });
  } catch (err) {
    console.error("❌ Error fetching docs:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};