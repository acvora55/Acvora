export const uploadUniversityMedia = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) return res.status(404).json({ message: "Not found" });

    const fileFields = [
      "logo",
      "bannerImage",
      "accreditationDoc",
      "affiliationDoc",
      "registrationDoc",
      "videos",
      "photos",
    ];

    fileFields.forEach((field) => {
      if (req.files[field]) {
        university[field] = req.files[field].map(
          (f) => `/uploads/${f.filename}`
        );
      }
    });

    await university.save();
    res.json({ success: true, university });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
