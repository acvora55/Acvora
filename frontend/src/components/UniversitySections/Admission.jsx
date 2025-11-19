import React, { useEffect, useState } from "react";
import "./Admission.css";

const Admission = ({ university }) => {
  const [admissionData, setAdmissionData] = useState([]);

  useEffect(() => {
    if (university?.admissions) {
      setAdmissionData(university.admissions);
    }
  }, [university]);

  if (!admissionData || admissionData.length === 0) {
    return (
      <section className="admission-section">
        <div className="admission-container">
          <h2 className="admission-heading">Admission Information</h2>
          <p style={{ textAlign: "center" }}>No admission data available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="admission-section">
      <div className="admission-container">
        <h2 className="admission-heading">
          {university?.instituteName} Admission 2025
        </h2>

        <div className="admission-grid">
          {admissionData.map((item, index) => (
            <div key={index} className="admission-card">
              <h3 className="admission-course-title">{item.courseName}</h3>
              <ul className="admission-course-details">
                <li><strong>Eligibility:</strong> {item.eligibility}</li>
                <li><strong>Specialization:</strong> {item.specialization}</li>
                <li><strong>Fees:</strong> {item.fee}</li>
                <li><strong>Highest Package:</strong> {item.highestPack}</li>
                <li><strong>Average Package:</strong> {item.avgPack}</li>
              </ul>
              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <a
                  href={item.applicationLink || "#"}
                  className="admission-btn admission-btn-apply"
                >
                  Apply Now
                </a>
                <a
                  href={item.questionPaperLink || "#"}
                  className="admission-btn admission-btn-qp"
                >
                  Question Papers
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Admission;
