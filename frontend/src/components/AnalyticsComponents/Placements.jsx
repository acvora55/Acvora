import React from "react";
import { FaBriefcase, FaLock } from "react-icons/fa";

export default function Placements({ placementStats, subscribed }) {
  // ✅ Provide fallback sample values
  const stats = placementStats || {
    totalCompanies: 120,
    highestPackage: "45 LPA",
    averagePackage: "12 LPA",
    placementRate: 92,
  };

  return (
    <div
      className={`analytics-widget-card premium-widget ${
        !subscribed ? "locked" : ""
      }`}
    >
      <h3 className="analytics-widget-title">
        <FaBriefcase /> Placements
      </h3>
      <ul>
        <li>🏢 Total Companies: {stats.totalCompanies}</li>
        <li>💰 Highest Package: {stats.highestPackage}</li>
        <li>📊 Average Package: {stats.averagePackage}</li>
        <li>✅ Placement Rate: {stats.placementRate}%</li>
      </ul>

      {!subscribed && (
        <div className="premium-overlay">
          <FaLock className="lock-icon" />{" "}
          <span>Upgrade to view placement insights</span>
        </div>
      )}
    </div>
  );
}
