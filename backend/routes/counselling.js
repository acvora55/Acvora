import express from "express";
import {
    createCounselling,
    getAllCounsellings,
    getUserCounsellings,
} from "../controllers/counsellingController.js";

const router = express.Router();

// POST /api/counselling - create a counselling booking
router.post("/", createCounselling);

// GET /api/counselling - (admin) get all counsellings
router.get("/", getAllCounsellings);

// GET /api/counselling/:userId - get counselling bookings for a specific user
router.get("/:userId", getUserCounsellings);

export default router;
