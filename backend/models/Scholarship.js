import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UniversityRegistration",
      required: true,
    },
    name: String,
    provider: String,
    category: String,
    income: String,
    educationLevel: String,
    benefits: String,
    deadline: String,
    status: String,
    description: String,
    eligibility: String,
    type: String,
    region: String,
    generalQuota: String,
    tags: [String],
  },
  { timestamps: true }
  
);

export default mongoose.model("Scholarship", scholarshipSchema);
