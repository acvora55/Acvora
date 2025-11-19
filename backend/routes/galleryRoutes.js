import express from "express";
import { uploadGallery, getGallery } from "../controllers/galleryController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/:universityId/gallery/upload",
  upload.fields([
    { name: "infraPhotos", maxCount: 10 },
    { name: "eventPhotos", maxCount: 10 },
    { name: "galleryImages", maxCount: 20 },
  ]),
  uploadGallery
);


router.get("/:universityId/gallery", getGallery);

export default router;
