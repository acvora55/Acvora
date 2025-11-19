import React, { useState, useEffect } from "react";
import "./ViewScholarships.css";

export default function ViewScholarships() {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch("https://acvora-07fo.onrender.com/api/scholarships");
        const data = await res.json();
        setScholarships(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchScholarships();
  }, []);

  return (
    <div className="ad-vs-page">
      <div className="ad-vs-content">
        <div className="ad-vs-container">
          <div className="ad-vs-header">
            <h1 className="ad-vs-title">View Scholarships</h1>
            <p className="ad-vs-subtitle">Browse all available scholarships.</p>
          </div>

          <div className="ad-vs-list-container">
            <h2 className="ad-vs-list-title">Scholarships List</h2>
            {scholarships.length === 0 ? (
              <div className="ad-vs-empty">
                <p>No scholarships available yet.</p>
              </div>
            ) : (
              <div className="ad-vs-list">
                {scholarships.map((s) => (
                  <div key={s._id} className="ad-vs-item">
                    <h3 className="ad-vs-item-name">{s.name}</h3>
                    <p className="ad-vs-item-desc">{s.description}</p>
                    <p><strong>Provider:</strong> {s.provider || "—"}</p>
                    <p><strong>Deadline:</strong> {s.deadline || "—"}</p>
                    <p><strong>Status:</strong> {s.status || "—"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
