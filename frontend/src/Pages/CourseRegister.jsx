import React, { useState, useEffect } from "react";
import "./CourseRegister.css";

export default function CourseRegister() {
  const [specializations, setSpecializations] = useState([
    { name: "", image: null, imagePreview: "", description: "" },
  ]);
  const [topInstituteImages, setTopInstituteImages] = useState([]);
  const [formData, setFormData] = useState({
    courseTitle: "",
    shortName: "",
    description: "",
    duration: "",
    fees: "",
    mode: "",
    level: "",
    highlights: "",
    internship: "",
    placement: "",
    eligibility: "",
    admissionProcess: "",
    curriculum: "",
    topInstitutes: "",
    careerRoles: "",
    scholarships: "",
    abroadOptions: "",
    faqs: "",
    applyLink: "",
  });

  // === form handlers ===
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Specialization handlers
  const addSpecialization = () => {
    setSpecializations((prev) => [
      ...prev,
      { name: "", image: null, imagePreview: "", description: "" },
    ]);
  };

  const removeSpecialization = (index) => {
    setSpecializations((prev) => {
      const removed = prev[index];
      // revoke preview URL if present
      if (removed?.imagePreview) URL.revokeObjectURL(removed.imagePreview);
      const next = prev.filter((_, i) => i !== index);
      return next.length ? next : [{ name: "", image: null, imagePreview: "", description: "" }];
    });
  };

  const handleSpecializationNameChange = (index, value) => {
    setSpecializations((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], name: value };
      return copy;
    });
  };

  const handleSpecializationDescChange = (index, value) => {
    setSpecializations((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], description: value };
      return copy;
    });
  };

  const handleSpecializationFileChange = (index, file) => {
    if (!file) return;
    setSpecializations((prev) => {
      const copy = [...prev];
      // revoke previous preview if any
      if (copy[index]?.imagePreview) URL.revokeObjectURL(copy[index].imagePreview);
      const preview = URL.createObjectURL(file);
      copy[index] = { ...copy[index], image: file, imagePreview: preview };
      return copy;
    });
  };

  // Top institute images (kept similar to your original)
  const handleTopInstituteFileChange = (e) => {
    const files = Array.from(e.target.files).map((f) => ({ file: f, description: "" }));
    setTopInstituteImages(files);
  };

  const handleTopInstituteDescChange = (index, value) => {
    setTopInstituteImages((prev) => {
      const copy = [...prev];
      copy[index].description = value;
      return copy;
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));

      // Append specializations (names + images + descriptions)
      specializations.forEach((spec, i) => {
        // Names (array)
        data.append("specializationNames[]", spec.name || "");

        // Images
        if (spec.image) data.append("specializationImages", spec.image);

        // Image descriptions
        data.append("specializationDescriptions[]", spec.description || "");
      });

      // Append top institute images + descriptions
      topInstituteImages.forEach((item) => {
        data.append("topInstituteImages", item.file);
        data.append("topInstituteDescriptions[]", item.description);
      });

      const res = await fetch("https://acvora-07fo.onrender.com/api/courses", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to save course");

      const responseData = await res.json();
      console.log("✅ Course saved:", responseData);
      alert("✅ Course registered successfully!");

      // Optional: reset form after success
      setFormData({
        courseTitle: "",
        shortName: "",
        description: "",
        duration: "",
        fees: "",
        mode: "",
        level: "",
        highlights: "",
        internship: "",
        placement: "",
        eligibility: "",
        admissionProcess: "",
        curriculum: "",
        topInstitutes: "",
        careerRoles: "",
        scholarships: "",
        abroadOptions: "",
        faqs: "",
        applyLink: "",
      });

      // clean up specializations previews
      specializations.forEach((s) => s.imagePreview && URL.revokeObjectURL(s.imagePreview));
      setSpecializations([{ name: "", image: null, imagePreview: "", description: "" }]);
      setTopInstituteImages([]);
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Something went wrong while saving the course!");
    }
  };

  // Revoke object URLs on unmount
  useEffect(() => {
    return () => {
      specializations.forEach((s) => s.imagePreview && URL.revokeObjectURL(s.imagePreview));
      topInstituteImages.forEach((t) => t.preview && URL.revokeObjectURL(t.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="course-register-container">
      <div className="course-card">
        <h2 className="course-title">Register a New Course</h2>
        <form onSubmit={handleSubmit} className="course-form">
          {/* Basic Info */}
          <div className="form-group">
            <label>Course Title</label>
            <input
              type="text"
              name="courseTitle"
              placeholder="e.g. Business Administration (BBA)"
              value={formData.courseTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Short Name</label>
            <input
              type="text"
              name="shortName"
              placeholder="e.g. BBA"
              value={formData.shortName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Brief overview of the course"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Key Details */}
          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              placeholder="e.g. 3 years"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Fees (Avg per year)</label>
            <input
              type="text"
              name="fees"
              placeholder="e.g. ₹1.5–4 Lakh/year"
              value={formData.fees}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mode</label>
            <input
              type="text"
              name="mode"
              placeholder="e.g. Full-time"
              value={formData.mode}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Level</label>
            <input
              type="text"
              name="level"
              placeholder="e.g. Undergraduate"
              value={formData.level}
              onChange={handleChange}
            />
          </div>

          {/* Highlights */}
          <div className="form-group">
            <label>Key Highlights</label>
            <textarea
              name="highlights"
              placeholder="Enter highlights separated by commas"
              value={formData.highlights}
              onChange={handleChange}
            />
          </div>

          {/* Internship & Placement */}
          <div className="form-group">
            <label>Internship</label>
            <input
              type="text"
              name="internship"
              placeholder="e.g. 8–12 weeks"
              value={formData.internship}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Placement</label>
            <input
              type="text"
              name="placement"
              placeholder="e.g. Placement assistance available"
              value={formData.placement}
              onChange={handleChange}
            />
          </div>

          {/* === UPDATED SPECIALIZATIONS SECTION === */}
          <div className="form-group">
            <label>Specializations</label>

            {specializations.map((spec, idx) => (
              <div key={idx} className="specialization-row">
                <div className="spec-controls">
                  <input
                    type="text"
                    placeholder="Specialization name (e.g. Finance)"
                    value={spec.name}
                    onChange={(e) => handleSpecializationNameChange(idx, e.target.value)}
                    required={idx === 0}
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSpecializationFileChange(idx, e.target.files?.[0] || null)}
                  />

                  {spec.imagePreview && (
                    <div className="spec-preview">
                      <img src={spec.imagePreview} alt={`spec-${idx}`} style={{ maxWidth: 150, maxHeight: 90 }} />
                    </div>
                  )}

                  <input
                    type="text"
                    placeholder="Image description (optional)"
                    value={spec.description}
                    onChange={(e) => handleSpecializationDescChange(idx, e.target.value)}
                  />

                  <div className="spec-actions">
                    <button type="button" onClick={() => removeSpecialization(idx)} className="spec-remove">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 8 }}>
              <button type="button" onClick={addSpecialization} className="spec-add">
                + Add more specialization
              </button>
            </div>
          </div>

          {/* Eligibility & Admission */}
          <div className="form-group">
            <label>Eligibility</label>
            <textarea
              name="eligibility"
              placeholder="Eligibility criteria"
              value={formData.eligibility}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Admission Process</label>
            <textarea
              name="admissionProcess"
              placeholder="Steps for admission"
              value={formData.admissionProcess}
              onChange={handleChange}
            />
          </div>

          {/* Curriculum */}
          <div className="form-group">
            <label>Curriculum Snapshot</label>
            <textarea
              name="curriculum"
              placeholder="Year-wise curriculum details"
              value={formData.curriculum}
              onChange={handleChange}
            />
          </div>

          {/* Top Institutes */}
          <div className="form-group">
            <label>Top Institutes</label>
            <textarea
              name="topInstitutes"
              placeholder="Colleges/universities offering this course"
              value={formData.topInstitutes}
              onChange={handleChange}
            />
            <input type="file" multiple accept="image/*" onChange={handleTopInstituteFileChange} />
            {topInstituteImages.length > 0 &&
              topInstituteImages.map((item, idx) => (
                <div key={idx} className="top-institute-row">
                  {item?.file && <p>{item.file.name}</p>}
                  <input
                    type="text"
                    placeholder="Institute description (optional)"
                    value={item?.description || ""}
                    onChange={(e) => handleTopInstituteDescChange(idx, e.target.value)}
                  />
                </div>
              ))}
          </div>

          {/* Career */}
          <div className="form-group">
            <label>Career Opportunities</label>
            <textarea
              name="careerRoles"
              placeholder="Popular roles after graduation"
              value={formData.careerRoles}
              onChange={handleChange}
            />
          </div>

          {/* Scholarships */}
          <div className="form-group">
            <label>Scholarships</label>
            <textarea
              name="scholarships"
              placeholder="Scholarship & financial aid options"
              value={formData.scholarships}
              onChange={handleChange}
            />
          </div>

          {/* Abroad Options */}
          <div className="form-group">
            <label>Study Abroad & Exchange</label>
            <textarea
              name="abroadOptions"
              placeholder="Global exposure opportunities"
              value={formData.abroadOptions}
              onChange={handleChange}
            />
          </div>

          {/* FAQs */}
          <div className="form-group">
            <label>FAQs</label>
            <textarea name="faqs" placeholder="Common student queries" value={formData.faqs} onChange={handleChange} />
          </div>

          {/* Apply Link */}
          <div className="form-group">
            <label>Apply Link</label>
            <input
              type="url"
              name="applyLink"
              placeholder="https://example.com/apply"
              value={formData.applyLink}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="course-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}