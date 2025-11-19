import mongoose from "mongoose";

const specializationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, default: "" },
  description: { type: String, default: "" },
});

const topInstituteImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  description: { type: String, default: "" },
});

const courseSchema = new mongoose.Schema(
  {
    courseTitle: { type: String, required: true, trim: true },
    shortName: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    duration: { type: String, default: "" },
    fees: { type: String, default: "" },
    mode: { type: String, default: "" },
    level: { type: String, default: "" },
    highlights: { type: String, default: "" },
    internship: { type: String, default: "" },
    placement: { type: String, default: "" },
    eligibility: { type: String, default: "" },
    admissionProcess: { type: String, default: "" },
    curriculum: { type: String, default: "" },
    topInstitutes: { type: String, default: "" },
    careerRoles: { type: String, default: "" },
    scholarships: { type: String, default: "" },
    abroadOptions: { type: String, default: "" },
    faqs: { type: String, default: "" },
    applyLink: { type: String, default: "" },
    specializations: [specializationSchema],
    topInstituteImages: [topInstituteImageSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
