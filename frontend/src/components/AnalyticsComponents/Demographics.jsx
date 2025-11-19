import React from "react";
import { FaUsers } from "react-icons/fa";

export default function Demographics({ demographics = [] }) {
  // Default fallback demographics
  const defaultData = [
    { label: "Male", value: 60 },
    { label: "Female", value: 38 },
    { label: "Other", value: 2 },
  ];

  const displayData = demographics.length > 0 ? demographics : defaultData;

  return (
    <div className="analytics-widget-card">
      <h3 className="analytics-widget-title">
        <FaUsers /> Student Demographics
      </h3>
      {displayData.length > 0 ? (
        <ul>
          {displayData.map((d, i) => (
            <li key={i}>
              <span className="analytics-dot" /> {d.label}: <b>{d.value}%</b>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: "0.8rem", color: "gray" }}>
          No demographic data available
        </p>
      )}
    </div>
  );
}
