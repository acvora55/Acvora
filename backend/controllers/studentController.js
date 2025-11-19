import Student from "../models/Student.js";

export const addStudent = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      contactNumber,
      email,
      address,
      parentName,
      parentContact,
      board,
      stream,
      schoolName,
      yearOfPassing,
      subjects,
      totalPercentage,
      rollNumber,
      course,
      specialization,
      mode,
      hostelRequired,
      university,
      declaration,
      studentSignature,
      guardianSignature,
    } = req.body;

    // Cloudinary URLs
    const documents = {
      marksheet: req.files?.marksheet?.[0]?.path || "",
      tc: req.files?.tc?.[0]?.path || "",
      migration: req.files?.migration?.[0]?.path || "",
      photo: req.files?.photo?.[0]?.path || "",
      idProof: req.files?.idProof?.[0]?.path || "",
    };
    const paymentReceipt = req.files?.paymentReceipt?.[0]?.path || "";

    const newStudent = new Student({
      fullName,
      dateOfBirth,
      gender,
      contactNumber,
      email,
      address,
      parentName,
      parentContact,
      board,
      stream,
      schoolName,
      yearOfPassing,
      subjects: Array.isArray(subjects) ? subjects : subjects?.split(","),
      totalPercentage,
      rollNumber,
      course,
      specialization,
      mode,
      hostelRequired,
      university,
      documents,
      paymentReceipt,
      declaration,
      studentSignature,
      guardianSignature,
    });

    await newStudent.save();
    res.status(201).json({ success: true, student: newStudent });
  } catch (err) {
    console.error("❌ Error adding student:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
