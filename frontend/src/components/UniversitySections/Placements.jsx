// frontend/components/UniversitySections/Placements.jsx
import React, { useState, useEffect } from "react";
import "./Placement.css";
import { applyTheme } from "../../utils/themeUtils";

const Placement = ({ darkMode, university }) => {
  const [openBranch, setOpenBranch] = useState(null);
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  // ✅ Fetch recruitersLogos from university prop
  useEffect(() => {
    if (university?.recruitersLogos) {
      setRecruiters(university.recruitersLogos);
    }
  }, [university]);

  const toggleBranch = (index) => {
    setOpenBranch(openBranch === index ? null : index);
  };

  return (
    <div className={`placement-container ${darkMode ? "dark" : ""}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Placement Highlights 2024</h1>
        <p className="hero-subtitle">
          Empowering Futures with Top Recruiters and Record-Breaking Packages
        </p>
        <div className="hero-stats">
          <div>🎯 {university?.placementRate || "NA"} Placement Rate</div>
          <div>🏆 {university?.highestPackage || "NA"} Highest</div>
          <div>📊 {university?.avgPackage || "NA"} Average</div>
        </div>
      </section>

      {/* Top Recruiters */}
      <section className="recruiters-section">
        <h2 className="section-title">Top Recruiters</h2>
        <div className="recruiters-grid">
          {recruiters.length > 0 ? (
            recruiters.map((logo, index) => (
              <div key={index} className="recruiter-card">
                <img
                  src={logo}
                  alt={`Recruiter ${index}`}
                  className="recruiter-logo"
                />
              </div>
            ))
          ) : (
            <p className="text-center">No recruiter logos available.</p>
          )}
        </div>
      </section>

      {/* Year-wise Placement Stats */}
      <section className="stats-section">
        <h2 className="section-title">Year-wise Placement Stats</h2>
        <div className="stats-table-wrapper">
          <table className="stats-table">
            <thead>
              <tr>
                <th className="stats-th">Year</th>
                <th className="stats-th">Companies</th>
                <th className="stats-th">Placed</th>
                <th className="stats-th">Highest CTC</th>
                <th className="stats-th">Avg CTC</th>
              </tr>
            </thead>
            <tbody>
              {university?.placements?.length > 0 ? (
                university.placements.map((row, idx) => (
                  <tr key={idx}>
                    <td className="stats-td">{row.year}</td>
                    <td className="stats-td">{row.companies}</td>
                    <td className="stats-td">{row.placed}</td>
                    <td className="stats-td">{row.highestCTC}</td>
                    <td className="stats-td">{row.avgCTC}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No placement data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Branch-wise Placements */}
      <section className="branch-section">
        <h2 className="section-title">Branch-wise Placement</h2>
        <div className="branch-accordion">
          {university?.branches?.length > 0 ? (
            university.branches.map((item, index) => (
              <div key={index} className="accordion-item">
                <button
                  onClick={() => toggleBranch(index)}
                  className="accordion-toggle"
                >
                  <span className="accordion-title">{item.name}</span>
                  <span className="accordion-icon">
                    {openBranch === index ? "▲" : "▼"}
                  </span>
                </button>
                {openBranch === index && (
                  <div className="accordion-content">
                    <p>
                      Highest Package: <strong>{item.highestPackage}</strong>
                    </p>
                    <p>
                      Average Package: <strong>{item.avgPackage}</strong>
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center">No branch-wise placement data.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Placement;
