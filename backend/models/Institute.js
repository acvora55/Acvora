import mongoose from "mongoose";

const instituteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  courses: { type: [String], required: true },
  commission: { type: Number, required: true }, // percent as number, not "10%"
}, { timestamps: true });

const Institute = mongoose.model("Institute", instituteSchema);
export default Institute;
