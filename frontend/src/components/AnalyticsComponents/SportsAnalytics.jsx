import React from "react";
import { FaFootballBall } from "react-icons/fa";

export default function SportsAnalytics({ sportsStats }) {
  // ✅ Provide fallback sample values
  const stats = sportsStats || {
    teams: 15,
    medals: 42,
    facilities: "Indoor Stadium, Swimming Pool, Gymnasium, Cricket Ground",
  };

  return (
    <div className="analytics-widget-card">
      <h3 className="analytics-widget-title">
        <FaFootballBall /> Sports Analytics
      </h3>
      <ul>
        <li>⚽ Teams: {stats.teams}</li>
        <li>🥇 Medals Won: {stats.medals}</li>
        <li>🏟️ Facilities: {stats.facilities}</li>
      </ul>
    </div>
  );
}
