import React, { useState } from "react";
import "./AddStudent.css";

export default function AddStudent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    nationality: "",
    course: "",
    enrollmentDate: "",
    fatherName: "",
    motherName: "",
    guardianPhone: "",
    emergencyContact: "",
    bloodGroup: "",
    allergies: "",
    hobbies: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Student Added:\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="ud-studentform-page">
      <h2 className="ud-studentform-title">Add New Student</h2>

      <form className="ud-studentform-form" onSubmit={handleSubmit}>

        {/* 🔹 Personal Info */}
        <h3 className="ud-studentform-section">Personal Information</h3>
        <label className="ud-studentform-label">
          Name
          <input className="ud-studentform-input" type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label className="ud-studentform-label">
          Email
          <input className="ud-studentform-input" type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label className="ud-studentform-label">
          Phone
          <input className="ud-studentform-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <label className="ud-studentform-label">
          Date of Birth
          <input className="ud-studentform-input" type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </label>
        <label className="ud-studentform-label">
          Gender
          <select className="ud-studentform-select" name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </label>
        <label className="ud-studentform-label">
          Address
          <input className="ud-studentform-input" type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <label className="ud-studentform-label">
          Nationality
          <input className="ud-studentform-input" type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
        </label>

        {/* 🔹 Academic Info */}
        <h3 className="ud-studentform-section">Academic Information</h3>
        <label className="ud-studentform-label">
          Course
          <input className="ud-studentform-input" type="text" name="course" value={formData.course} onChange={handleChange} />
        </label>
        <label className="ud-studentform-label">
          Enrollment Date
          <input className="ud-studentform-input" type="date" name="enrollmentDate" value={formData.enrollmentDate} onChange={handleChange} />
        </label>

        {/* 🔹 Guardian Info */}
        <h3 className="ud-studentform-section">Guardian Information</h3>
        <label className="ud-studentform-label">
          Father's Name
          <input className="ud-studentform-input" type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />
        </label>
        <label className="ud-studentform-label">
          Mother's Name
          <input className="ud-studentform-input" type="text" name="motherName" value={formData.motherName} onChange={handleChange} />
        </label>
        <label className="ud-studentform-label">
          Guardian Phone
          <input className="ud-studentform-input" type="tel" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} />
        </label>
        <label className="ud-studentform-label">
          Emergency Contact
          <input className="ud-studentform-input" type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />
        </label>

        <button type="submit" className="ud-studentform-btn-primary">Save Student</button>
      </form>

      <button
        className="ud-studentform-btn-link"
        onClick={() => window.dispatchEvent(new CustomEvent("navigate", { detail: "dashboard" }))}
      >
        ⬅ Back to Dashboard
      </button>
    </div>
  );
}
