import React from "react";
import { FaBuilding } from "react-icons/fa";

export default function FacilitiesUsage({ facilities = [] }) {
  // Default fallback facilities
  const defaultFacilities = [
    { name: "Library", usage: 75 },
    { name: "Sports Complex", usage: 60 },
    { name: "Labs", usage: 82 },
    { name: "Cafeteria", usage: 90 },
    { name: "Hostel", usage: 85 },
  ];

  const displayData = facilities.length > 0 ? facilities : defaultFacilities;

  return (
    <div className="analytics-widget-card">
      <h3 className="analytics-widget-title">
        <FaBuilding /> Facilities Usage
      </h3>
      {displayData.length > 0 ? (
        <ul>
          {displayData.map((f, i) => (
            <li key={i}>
              <span className="analytics-dot" /> {f.name}:{" "}
              <b>{f.usage}% utilization</b>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: "0.8rem", color: "gray" }}>
          No facility usage data available
        </p>
      )}
    </div>
  );
}
