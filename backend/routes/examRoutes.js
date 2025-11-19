import express from "express";
import { createExam, getExams, getExamById } from "../controllers/examController.js";

const router = express.Router();

router.post("/", createExam);     // Save exam
router.get("/", getExams);        // Get all exams
router.get("/:id", getExamById);  // Get single exam

export default router;
