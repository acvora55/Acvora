import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import PDFDocument from "pdfkit";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import UniversityRegistration from "./models/University.js";

// Routes
import cutoffRoutes from "./routes/cutoffRoutes.js";
import universityRoutes from "./routes/university.js";
import uploadCourseRoutes from "./routes/uploadCourses.js";
import admissionsRoutes from "./routes/admissions.js";
import recruitersRoutes from "./routes/recruitersRoutes.js";
import placementsRoutes from "./routes/placementsRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import scholarshipRoutes from "./routes/scholarshipRoutes.js";
import signupRoutes from "./routes/signup.js";
import instituteRoutes from "./routes/instituteRoutes.js";
import profileRoutes from "./routes/profile.js";
// ✅ New import for saved courses routes
import savedCoursesRoutes from "./routes/savedCourses.js";
import savedScholarshipsRoutes from "./routes/savedScholarships.js";
import counsellingRoutes from "./routes/counselling.js";

dotenv.config();
const app = express();

/* ------------------------ Cloudinary config ------------------------ */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

/* ------------------------ CORS (FIXED) ------------------------ */
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://acvora.vercel.app",
  "https://acvora-theta.vercel.app",
  "https://acvora-git-main-acvoras-projects.vercel.app",
  "https://acvora-h45fy0xph-acvoras-projects.vercel.app"
];




// ✅ must be above express.json and all routes
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

// ✅ Parse JSON and URL-encoded data after CORS setup
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ✅ Ensure uploads folder exists (for local file storage)
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ✅ Serve uploaded files publicly (e.g. course images)
app.use("/uploads", express.static("uploads"));

/* ------------------------ Multer + Cloudinary ------------------------ */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "universities",
    resource_type: "auto",
  }),
});
const upload = multer({ storage });

/* ------------------------ Mongo connection ------------------------ */
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ MONGO_URI not found in .env");
  process.exit(1);
}

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ MongoDB Atlas connection error:", err.message);
    process.exit(1);
  });


/* ------------------------ Registration Schema ------------------------ */
const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Registration = mongoose.model("Registration", registrationSchema);

/* ------------------------ News Schema ------------------------ */
const newsSchema = new mongoose.Schema({
  universityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UniversityRegistration",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: "General" },
  date: { type: Date, default: Date.now },
  image: { type: String },
});
const News = mongoose.model("News", newsSchema);

/* ------------------------ Student Schema ------------------------ */
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  university: { type: String, required: true },
  status: { type: String, default: "Pending" },
  details: {
    fullName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    parentName: { type: String, required: true },
    parentContact: { type: String, required: true },
    board: { type: String, required: true },
    stream: { type: String, required: true },
    schoolName: { type: String, required: true },
    yearOfPassing: { type: String, required: true },
    subjects: [{ type: String }],
    totalPercentage: { type: String, required: true },
    rollNumber: { type: String, required: true },
    course: { type: String, required: true },
    specialization: { type: String },
    mode: { type: String, required: true },
    hostelRequired: { type: String, required: true },
    university: { type: String, required: true },
    documents: {
      marksheet: { type: String, required: true },
      tc: { type: String, required: true },
      migration: { type: String, required: true },
      photo: { type: String, required: true },
      idProof: { type: String, required: true },
    },
    paymentReceipt: { type: String },
    declaration: { type: Boolean, required: true },
    studentSignature: { type: String },
    guardianSignature: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Student = mongoose.model("Student", studentSchema);

/* ------------------------ Routes (inline) ------------------------ */
app.post("/register", async (req, res) => {
  try {
    const { name, mobileNumber, location } = req.body || {};
    if (!name || !mobileNumber || !location) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (name, mobileNumber, location)",
      });
    }

    const reg = new Registration({ name, mobileNumber, location });
    await reg.save();
    return res
      .status(201)
      .json({ success: true, message: "Registration successful", reg });
  } catch (err) {
    console.error("Error in /register:", err);
    return res
      .status(500)
      .json({ success: false, message: "Registration failed", error: err.message });
  }
});

app.post("/api/university-registration", upload.any(), async (req, res) => {
  try {
    console.log("📥 Incoming body:", req.body);
    console.log("📂 Incoming files:", req.files?.map(f => ({ field: f.fieldname, url: f.path })));

    if (req.body.facilities) {
      try { req.body.facilities = JSON.parse(req.body.facilities); }
      catch { req.body.facilities = []; }
    }
    if (req.body.branches) {
      try { req.body.branches = JSON.parse(req.body.branches); }
      catch { req.body.branches = []; }
    }

    const getFiles = (field) =>
      req.files?.filter((f) => f.fieldname === field).map((f) => f.path) || [];

    const newUniversity = new UniversityRegistration({
      ...req.body,
      logo: getFiles("logo"),
      bannerImage: getFiles("bannerImage"),
      aboutImages: getFiles("aboutImages"),
      accreditationDoc: getFiles("accreditationDoc"),
      affiliationDoc: getFiles("affiliationDoc"),
      registrationDoc: getFiles("registrationDoc"),
      videos: getFiles("videos"),
      photos: getFiles("photos"),
      recruitersLogos: getFiles("recruitersLogos"),
      gallery: {
        infraPhotos: getFiles("infraPhotos"),
        eventPhotos: getFiles("eventPhotos"),
        otherPhotos: getFiles("galleryImages"),
      },
    });

    await newUniversity.save();

    res.status(201).json({
      success: true,
      data: newUniversity,
    });
  } catch (err) {
    console.error("❌ Error registering university:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/news", upload.single("image"), async (req, res) => {
  try {
    const { title, description, category, date, universityId } = req.body;

    if (!title || !description || !universityId) {
      return res.status(400).json({ success: false, message: "Title, description and universityId are required" });
    }

    const newNews = new News({
      universityId,
      title,
      description,
      category,
      date: date || new Date(),
      image: req.file?.path || ""
    });

    await newNews.save();
    res.status(201).json({ success: true, message: "News added successfully", news: newNews });
  } catch (err) {
    console.error("❌ Error adding news:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/universities/:id/news", async (req, res) => {
  try {
    const uniNews = await News.find({ universityId: req.params.id }).sort({ date: -1 });
    res.json({ success: true, news: uniNews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete("/api/news/:id", async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "News not found" });
    res.json({ success: true, message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/universities/:id", async (req, res) => {
  try {
    const uni = await UniversityRegistration.findById(req.params.id);
    if (!uni) {
      return res.status(404).json({ success: false, message: "University not found" });
    }
    res.json(uni);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put("/api/universities/:id", async (req, res) => {
  try {
    const updated = await UniversityRegistration.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "University not found" });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/universities/:id", async (req, res) => {
  try {
    const deleted = await UniversityRegistration.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "University not found" });
    }
    res.json({ success: true, message: "University deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ------------------------ Student Routes ------------------------ */

app.post("/api/students", async (req, res) => {
  try {
    const { name, email, university, status, details, createdAt, updatedAt } = req.body;

    if (!name || !email || !university || !details) {
      return res.status(400).json({
        success: false,
        message: "Name, email, university, and details are required",
      });
    }

    const newStudent = new Student({
      name,
      email,
      university,
      status,
      details,
      createdAt,
      updatedAt,
    });

    await newStudent.save();
    res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: newStudent,
    });
  } catch (err) {
    console.error("❌ Error adding student:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

app.put("/api/students/:id", async (req, res) => {
  try {
    const { name, email, university, status, details, updatedAt } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, university, status, details, updatedAt },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (err) {
    console.error("❌ Error updating student:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// Get all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error("❌ Error fetching students:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// Delete student
app.delete("/api/students/:id", async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.json({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting student:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// ✅ Recent Applications (last 5 students)
app.get("/api/students/recent", async (req, res) => {
  try {
    const recent = await Student.find().sort({ createdAt: -1 }).limit(5);
    res.json(recent);
  } catch (err) {
    console.error("❌ Error fetching recent applications:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/students/stats", async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const applicationsThisMonth = await Student.countDocuments({
      createdAt: { $gte: startOfMonth },
    });

    const confirmedAdmissions = await Student.countDocuments({ status: "Approved" });
    const pendingApplications = await Student.countDocuments({ status: "Pending" });

    // Example commission logic (₹500 per confirmed admission)
    const commissionEarned = confirmedAdmissions * 500;

    res.json({
      applicationsThisMonth,
      confirmedAdmissions,
      commissionEarned,
      pendingApplications, // 👈 renamed here
    });
  } catch (err) {
    console.error("❌ Error fetching stats:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// example
app.get("/api/students/:id/pdf", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send("Student not found");

    // generate PDF dynamically
    const pdf = generateStudentPdf(student); // <- you need a function here
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="application_${student._id}.pdf"`,
    });
    res.send(pdf);
  } catch (err) {
    res.status(500).send("Error generating PDF");
  }
});

/* ------------------------ Mount Routers ------------------------ */
app.use("/api/signup", signupRoutes);
app.use("/api/universities", universityRoutes);
app.use("/api/universities", uploadCourseRoutes);
app.use("/api/cutoff", cutoffRoutes);
app.use("/api/admissions", admissionsRoutes);
app.use("/api/recruiters", recruitersRoutes);
app.use("/api/universities", placementsRoutes);
app.use("/api/universities", galleryRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/universities", scholarshipRoutes);
app.use("/api/institutes", instituteRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/savedCourses", savedCoursesRoutes);
app.use("/api/savedScholarships", savedScholarshipsRoutes);
app.use("/api/counselling", counsellingRoutes);

/* ------------------------ Health check ------------------------ */
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

/* ------------------------ Error handler ------------------------ */
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, error: "Internal server error" });
});

/* ------------------------ Start server ------------------------ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('Database connected:');
  console.log("Health check available at /api/health");
});