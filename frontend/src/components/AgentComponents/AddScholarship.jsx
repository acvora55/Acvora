import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./AddScholarship.css"; // Updated CSS

export default function AddScholarship() {
  const [formData, setFormData] = useState({
    name: "",
    provider: "",
    category: "",
    income: "",
    educationLevel: "",
    benefits: "",
    deadline: "",
    status: "",
    description: "",
    eligibility: "",
    type: "",
    region: "",
    generalQuota: "",
  });

  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tags = [];
    if (formData.category) tags.push(formData.category);
    if (formData.income) tags.push(`≤${formData.income} income`);
    if (formData.educationLevel) tags.push(formData.educationLevel);

    const newScholarship = { ...formData, tags };

    try {
      const res = await fetch("https://acvora-1.onrender.com/api/scholarships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newScholarship),
      });

      if (!res.ok) throw new Error("Failed to save scholarship");

      setFormData({
        name: "",
        provider: "",
        category: "",
        income: "",
        educationLevel: "",
        benefits: "",
        deadline: "",
        status: "",
        description: "",
        eligibility: "",
        type: "",
        region: "",
        generalQuota: "",
      });
      alert("Scholarship added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving scholarship");
    }
  };

  return (
    <div className="ad-addsch-container">
      <div className="ad-addsch-main">
        <div className="ad-addsch-inner">
          {/* Header */}
          <div className="ad-addsch-header">
            <h1 className="ad-addsch-title">Add Scholarship</h1>
            <p className="ad-addsch-subtitle">Create a new scholarship entry.</p>
          </div>

          {/* Form Card */}
          <div className="ad-addsch-card">
            <h2 className="ad-addsch-card-title">Add New Scholarship</h2>
            <form onSubmit={handleSubmit} className="ad-addsch-form-grid">
              {/* Fields */}
              <div className="ad-addsch-form-group">
                <label>Scholarship Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter scholarship name"
                  required
                />
              </div>
              <div className="ad-addsch-form-group">
                <label>Provider</label>
                <input
                  name="provider"
                  value={formData.provider}
                  onChange={handleChange}
                  placeholder="e.g., Central Govt"
                  required
                />
              </div>
              <div className="ad-addsch-form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select Category</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="OBC">OBC</option>
                  <option value="General">General</option>
                  <option value="Minority">Minority</option>
                </select>
              </div>
              <div className="ad-addsch-form-group">
                <label>Family Income Limit</label>
                <select name="income" value={formData.income} onChange={handleChange}>
                  <option value="">Select Income Limit</option>
                  <option value="3L">3L</option>
                  <option value="5L">5L</option>
                  <option value="7L">7L</option>
                </select>
              </div>
              <div className="ad-addsch-form-group">
                <label>Education Level</label>
                <select
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                >
                  <option value="">Select Level</option>
                  <option value="UG">UG</option>
                  <option value="PG">PG</option>
                  <option value="UG/PG">UG/PG</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
              <div className="ad-addsch-form-group">
                <label>Benefits</label>
                <input
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleChange}
                  placeholder="e.g., ₹50,000 / year"
                />
              </div>
              <div className="ad-addsch-form-group">
                <label>Deadline</label>
                <input
                  type="text"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  placeholder="e.g., 15 Sept (soon)"
                />
              </div>
              <div className="ad-addsch-form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="">Select Status</option>
                  <option value="Open">Open</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="ad-addsch-form-group ad-span-3">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Provide a detailed description..."
                />
              </div>
              <div className="ad-addsch-form-group ad-span-3">
                <label>Eligibility</label>
                <textarea
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., Undergraduate students with GPA > 3.0"
                />
              </div>
              <div className="ad-addsch-form-group">
                <label>Scholarship Type</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                  <option value="">Select Type</option>
                  <option value="Merit">Merit</option>
                  <option value="Need">Need</option>
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                </select>
              </div>
              <div className="ad-addsch-form-group">
                <label>State / Region</label>
                <select name="region" value={formData.region} onChange={handleChange}>
                  <option value="">Select Region</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                </select>
              </div>
              <div className="ad-addsch-form-group">
                <label>General Quota</label>
                <select name="generalQuota" value={formData.generalQuota} onChange={handleChange}>
                  <option value="">Select Quota</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="ad-addsch-form-group ad-span-3">
                <button type="submit" className="ad-addsch-submit-btn">
                  Add Scholarship
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
