// models/Signup.js
import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  firebaseId: { type: String },
  address: String,
  pincode: String,
  createdAt: { type: Date, default: Date.now },
  savedCourses: [
    {
      courseId: String,
      courseTitle: String,
      eligibility: String,
    },
  ],
  savedScholarships: [
  { type: mongoose.Schema.Types.ObjectId, ref: "Scholarship" }
],
});

const Signup = mongoose.model("Signup", signupSchema);
export default Signup;
