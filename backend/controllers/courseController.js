import Course from "../models/Course.js";

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new course
export const createCourse = async (req, res) => {
  try {
    const { body, files } = req;

    // === Specializations ===
    const specializationNames = Array.isArray(body.specializationNames)
      ? body.specializationNames
      : typeof body.specializationNames === "string"
      ? [body.specializationNames]
      : [];
    const specializationDescriptions = Array.isArray(body.specializationDescriptions)
      ? body.specializationDescriptions
      : typeof body.specializationDescriptions === "string"
      ? [body.specializationDescriptions]
      : [];
    const specializationImages = Array.isArray(files?.specializationImages)
      ? files.specializationImages
      : [];

    // Validate lengths to prevent mismatches
    if (
      specializationImages.length &&
      (specializationImages.length !== specializationNames.length ||
        specializationImages.length !== specializationDescriptions.length)
    ) {
      return res.status(400).json({ error: "Mismatch in specialization data (names, images, descriptions)" });
    }

    // Map specializations
    const specializations = specializationNames.map((name, idx) => ({
      name: name || `Specialization ${idx + 1}`,
      image: specializationImages[idx]?.path || "",
      description: specializationDescriptions[idx] || "",
    }));

    // === Top Institutes ===
    const topInstituteDescriptions = Array.isArray(body.topInstituteDescriptions)
      ? body.topInstituteDescriptions
      : typeof body.topInstituteDescriptions === "string"
      ? [body.topInstituteDescriptions]
      : [];
    const topInstituteImages = Array.isArray(files?.topInstituteImages)
      ? files.topInstituteImages
      : [];

    // Validate lengths for top institutes
    if (
      topInstituteImages.length &&
      topInstituteImages.length !== topInstituteDescriptions.length
    ) {
      return res.status(400).json({ error: "Mismatch in top institute descriptions and images" });
    }

    // Map top institute images
    const topInstitutesData = topInstituteImages.map((file, idx) => ({
      url: file.path,
      description: topInstituteDescriptions[idx] || "",
    }));

    // Create new course
    const course = new Course({
  courseTitle: body.courseTitle?.trim(),
  shortName: body.shortName?.trim(),
  description: body.description?.trim(),
  duration: body.duration?.trim(),
  fees: body.fees?.trim(),
  mode: body.mode?.trim(),
  level: body.level?.trim(),
  highlights: body.highlights?.trim(),
  internship: body.internship?.trim(),
  placement: body.placement?.trim(),
  eligibility: body.eligibility?.trim(),
  admissionProcess: body.admissionProcess?.trim(),
  curriculum: body.curriculum?.trim(),
  topInstitutes: body.topInstitutes?.trim(),
  careerRoles: body.careerRoles?.trim(),
  scholarships: body.scholarships?.trim(),
  abroadOptions: body.abroadOptions?.trim(),
  faqs: body.faqs?.trim(),
  applyLink: body.applyLink?.trim(),
  specializations,
  topInstituteImages: topInstitutesData,
});


    await course.save();
    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};