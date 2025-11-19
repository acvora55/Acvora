import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";

export default function FinancialAid({ scholarships = [] }) {
  // Default fallback values
  const defaultScholarships = [
    { name: "Merit Scholarship", percent: 35 },
    { name: "Need-based Aid", percent: 25 },
    { name: "Sports Quota", percent: 15 },
  ];

  const displayData = scholarships.length > 0 ? scholarships : defaultScholarships;

  return (
    <div className="analytics-widget-card">
      <h3 className="analytics-widget-title">
        <FaMoneyBillWave /> Financial Aid
      </h3>
      {displayData.length > 0 ? (
        <ul>
          {displayData.map((s, i) => (
            <li key={i}>
              <span className="analytics-dot" /> {s.name}:{" "}
              <b>{s.percent}% students</b>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: "0.8rem", color: "gray" }}>
          No financial aid data available
        </p>
      )}
    </div>
  );
}
