import University from "../models/University.js";

// helper to normalize file path
const normalizePath = (p) => p.replace(/\\/g, "/");

// ✅ Upload Gallery
export const uploadGallery = async (req, res) => {
  try {
    const { universityId } = req.params;
    const uni = await University.findById(universityId);

    if (!uni) {
      return res.status(404).json({ success: false, message: "University not found" });
    }

    if (req.files.infraPhotos) {
      uni.gallery.infraPhotos.push(
        ...req.files.infraPhotos.map((f) => normalizePath(f.path))
      );
    }
    if (req.files.eventPhotos) {
      uni.gallery.eventPhotos.push(
        ...req.files.eventPhotos.map((f) => normalizePath(f.path))
      );
    }
    if (req.files.galleryImages) {
      uni.gallery.otherPhotos.push(
        ...req.files.galleryImages.map((f) => normalizePath(f.path))
      );
    }

    await uni.save();

    res.json({
      success: true,
      message: "Gallery uploaded successfully",
      gallery: uni.gallery,
    });
  } catch (err) {
    console.error("❌ Error uploading gallery:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get Gallery (to fetch in frontend)
export const getGallery = async (req, res) => {
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
      gallery: uni.gallery,
    });
  } catch (err) {
    console.error("❌ Error fetching gallery:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
