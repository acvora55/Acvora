import express from "express";
import {
  addScholarship,
  getScholarships,
  deleteScholarship,
  getScholarshipsByUniversity,
  addScholarshipToUniversity,
  deleteScholarshipFromUniversity,
} from "../controllers/scholarshipController.js";

const router = express.Router();

// Global scholarship routes
router.get("/", getScholarships);
router.post("/", addScholarship);
router.delete("/:id", deleteScholarship);

// University-scoped scholarship routes
router.get("/:id/scholarships", getScholarshipsByUniversity);
router.post("/:id/scholarships", addScholarshipToUniversity);
router.delete("/:id/scholarships/:scholarshipId", deleteScholarshipFromUniversity);

export default router;
