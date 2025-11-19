import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ViewScholarships.css";

export default function ViewScholarships() {
  const { id } = useParams();
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch(`https://acvora-07fo.onrender.com/api/universities/${id}/scholarships`);
        const data = await res.json();
        setScholarships(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchScholarships();
  }, [id]);

  return (
    <div className="ud-vs-page">
      <div className="ud-vs-content">
        <div className="ud-vs-container">
          <div className="ud-vs-header">
            <h1 className="ud-vs-title">View Scholarships</h1>
            <p className="ud-vs-subtitle">Browse all available scholarships.</p>
          </div>
          <div className="ud-vs-list-container">
            <h2 className="ud-vs-list-title">Scholarships List</h2>
            {scholarships.length === 0 ? (
              <div className="ud-vs-empty">
                <p>No scholarships available yet.</p>
              </div>
            ) : (
              <div className="ud-vs-list">
                {scholarships.map((s) => (
                  <div key={s._id} className="ud-vs-item">
                    <h3 className="ud-vs-item-name">{s.name}</h3>
                    <p className="ud-vs-item-desc">{s.description}</p>
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