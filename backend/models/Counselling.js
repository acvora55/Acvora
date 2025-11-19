import mongoose from "mongoose";

const counsellingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  ageDob: { type: String, required: true },
  cityState: { type: String, required: true },

  counselingType: { type: String, required: true },
  sessionMode: { type: String, required: true },
  sessionDate: { type: String, required: true },
  timeSlot: { type: String, required: true },

  currentClass: { type: String, required: true },
  intendedCourse: { type: String, required: true },
  questions: { type: String },

  paymentMethod: { type: String, required: true },
  agreeTerms: { type: Boolean, default: false },
  understandNonRefundable: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true }
, // link to logged-in user
});

const Counselling = mongoose.model("Counselling", counsellingSchema);

export default Counselling;
