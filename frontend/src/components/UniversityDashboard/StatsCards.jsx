import React from "react";
import "./StatsCards.css"; 
export default function StatsCards() {
  const stats = [
    { label: "Profile Views", value: "1.2K" },
    { label: "Leads", value: "320" },
    { label: "CTR", value: "4.8%" },
    { label: "Ranking", value: "#23" },
  ];
  return (
    <section className="ud-stats-grid">
      {stats.map((s) => (
        <div key={s.label} className="ud-stat-card ud-card">
          <div className="ud-stat-value">{s.value}</div>
          <div className="ud-stat-label">{s.label}</div>
        </div>
      ))}
    </section>
  );
}
