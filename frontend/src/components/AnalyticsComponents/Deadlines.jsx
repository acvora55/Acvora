import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

export default function Deadlines({ deadlines = [] }) {
  // Default fallback deadlines
  const defaultDeadlines = [
    "Early Admission: Nov 1, 2025",
    "Regular Admission: Jan 15, 2026",
    "Scholarship Deadline: Dec 1, 2025",
  ];

  const displayDeadlines = deadlines.length > 0 ? deadlines : defaultDeadlines;

  return (
    <div className="analytics-widget-card">
      <h3 className="analytics-widget-title">
        <FaCalendarAlt /> Deadlines
      </h3>
      {displayDeadlines.length > 0 ? (
        <ul>
          {displayDeadlines.map((d, i) => (
            <li key={i}>
              <span className="analytics-dot" /> {d}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: "0.8rem", color: "gray" }}>
          No upcoming deadlines available
        </p>
      )}
    </div>
  );
}
                                             