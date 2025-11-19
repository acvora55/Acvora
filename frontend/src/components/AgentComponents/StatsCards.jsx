import React from "react";
import "./StatsCards.css";

export default function StatsCards() {
  const stats = [
    { label: "Applications This Month", value: 42 },
    { label: "Confirmed Admissions", value: 18 },
    { label: "Commission Earned", value: "$3,200" },
    { label: "Pending Actions", value: 7 },
  ];

  return (
    <div className="ad-stats">
      {stats.map((stat, i) => (
        <div className="ad-stat-card" key={i}>
          <div className="ad-stat-value">{stat.value}</div>
          <div className="ad-stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
