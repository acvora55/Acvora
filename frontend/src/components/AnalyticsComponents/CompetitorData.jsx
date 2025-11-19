import React from "react";
import { FaChartBar, FaLock } from "react-icons/fa";

export default function CompetitorData({ competitors = [], subscribed }) {
  // Default fallback competitors
  const defaultCompetitors = [
    { n: "University A", g: "+5%", c: "green" },
    { n: "University B", g: "-2%", c: "red" },
    { n: "University C", g: "+3%", c: "green" },
  ];

  const displayCompetitors =
    competitors.length > 0 ? competitors : defaultCompetitors;

  return (
    <div
      className={`analytics-widget-card premium-widget ${
        !subscribed ? "locked" : ""
      }`}
    >
      <h3 className="analytics-widget-title">
        <FaChartBar /> Competitor Data
      </h3>

      {displayCompetitors.length > 0 ? (
        <ul>
          {displayCompetitors.map((c, i) => (
            <li key={i}>
              <span className="analytics-dot" /> {c.n}:{" "}
              <span style={{ color: c.c }}>{c.g}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: "0.8rem", color: "gray" }}>
          No competitor data available
        </p>
      )}

      {!subscribed && (
        <div className="premium-overlay">
          <FaLock className="lock-icon" />{" "}
          <span>Upgrade to view competitor insights</span>
        </div>
      )}
    </div>
  );
}
