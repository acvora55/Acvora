import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    // Upcoming exam fields
    examName: { type: String, required: true },
    examDate: { type: Date },
    syllabusLink: { type: String },
    applicationDeadline: { type: Date },

    // Result fields
    resultExamName: { type: String },
    resultDate: { type: Date },
    resultLink: { type: String },

    // Notifications
    notificationType: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);
export default Exam;
