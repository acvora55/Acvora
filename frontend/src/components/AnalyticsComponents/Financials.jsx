import React from "react";
import { FaChartLine } from "react-icons/fa";

export default function Financials({ stats }) {
  // Default financial data
  const defaultStats = {
    annualBudget: "₹200 Cr",
    revenueFromFees: "₹150 Cr",
    researchGrants: "₹30 Cr",
    donations: "₹20 Cr",
  };

  const displayStats = stats || defaultStats;

  return (
    <div className="analytics-widget-card">
      <h3 className="analytics-widget-title">
        <FaChartLine /> Financial Overview
      </h3>
      {displayStats ? (
        <ul>
          <li>📊 Annual Budget: {displayStats.annualBudget}</li>
          <li>🎓 Revenue from Fees: {displayStats.revenueFromFees}</li>
          <li>🔬 Research Grants: {displayStats.researchGrants}</li>
          <li>💰 Donations: {displayStats.donations}</li>
        </ul>
      ) : (
        <p style={{ fontSize: "0.8rem", color: "gray" }}>
          No financial data available
        </p>
      )}
    </div>
  );
}
