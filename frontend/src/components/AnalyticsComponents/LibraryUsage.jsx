import React from "react";
import { FaBook } from "react-icons/fa";

export default function LibraryUsage({ stats }) {
  // ✅ Provide fallback sample values
  const fallbackStats = {
    dailyVisitors: 320,
    booksIssued: 150,
    eResources: 420,
  };

  const data = stats || fallbackStats;

  return (
    <div className="analytics-widget-card">
      <h3 className="analytics-widget-title">
        <FaBook /> Library Usage
      </h3>
      <ul>
        <li>👩‍🎓 Daily Visitors: {data.dailyVisitors ?? "-"}</li>
        <li>📚 Books Issued: {data.booksIssued ?? "-"}</li>
        <li>💻 E-Resources Accessed: {data.eResources ?? "-"}</li>
      </ul>
    </div>
  );
}
