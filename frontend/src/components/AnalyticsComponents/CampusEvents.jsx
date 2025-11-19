import React from "react";
import { FaCalendarCheck } from "react-icons/fa";

export default function CampusEvents({ events = [] }) {
  // Default fallback events if none passed
  const defaultEvents = [
    "Tech Fest — Oct 2025",
    "Cultural Festival — Dec 2025",
    "Placement Drive — Jan 2026",
  ];

  const displayEvents = events.length > 0 ? events : defaultEvents;

  return (
    <div className="analytics-widget-card">
      <h3 className="analytics-widget-title">
        <FaCalendarCheck /> Campus Events
      </h3>
      {displayEvents.length > 0 ? (
        <ul>
          {displayEvents.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: "0.8rem", color: "gray" }}>No upcoming events</p>
      )}
    </div>
  );
}
