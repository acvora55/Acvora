import React from "react";
import { FaBed } from "react-icons/fa";

export default function HostelAnalytics({ stats }) {
  // Default values in case no props are passed
  const defaultStats = {
    totalBeds: 3000,
    occupancy: 85,
    monthlyFee: "₹5000",
  };

  const displayStats = stats || defaultStats;

  return (
    <div className="analytics-widget-card">
      <h3 className="analytics-widget-title">
        <FaBed /> Hostel Analytics
      </h3>
      {displayStats ? (
        <ul>
          <li>🛏️ Total Beds: {displayStats.totalBeds}</li>
          <li>📊 Occupancy: {displayStats.occupancy}%</li>
          <li>💰 Monthly Fee: {displayStats.monthlyFee}</li>
        </ul>
      ) : (
        <p style={{ fontSize: "0.8rem", color: "gray" }}>
          No hostel data available
        </p>
      )}
    </div>
  );
}
