import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function LocationInsights({ pieChartData }) {
  // ✅ Sample fallback data
  const fallbackData = [
    {
      region: "North",
      percentage: 25,
      color: "#4CAF50",
      path: "M50,50 L50,0 A50,50 0 0,1 93.3,25 Z",
    },
    {
      region: "South",
      percentage: 30,
      color: "#2196F3",
      path: "M50,50 L93.3,25 A50,50 0 0,1 50,100 Z",
    },
    {
      region: "East",
      percentage: 20,
      color: "#FFC107",
      path: "M50,50 L50,100 A50,50 0 0,1 6.7,75 Z",
    },
    {
      region: "West",
      percentage: 25,
      color: "#F44336",
      path: "M50,50 L6.7,75 A50,50 0 0,1 50,0 Z",
    },
  ];

  const chartData = pieChartData && pieChartData.length > 0 ? pieChartData : fallbackData;

  return (
    <div className="analytics-widget-card">
      <h3 className="analytics-widget-title">
        <FaMapMarkerAlt /> Location Insights
      </h3>

      {/* ✅ Flexbox layout: SVG left, list right */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <svg viewBox="0 0 100 100" width="70" height="90">
          {chartData.map((d, i) => (
            <path key={i} d={d.path} fill={d.color} />
          ))}
        </svg>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.9rem" }}>
          {chartData.map((d, i) => (
            <li key={i} style={{ marginBottom: "0.4rem" }}>
              <span
                className="analytics-dot"
                style={{
                  background: d.color,
                  display: "inline-block",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  marginRight: "6px",
                }}
              />
              {d.region}: {d.percentage}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
