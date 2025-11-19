import React from "react";
import { FaFlask } from "react-icons/fa";

export default function ResearchOutput() {
  const stats = {
    papers: 320,
    patents: 18,
    fundedProjects: 45,
  };

  return (
    <div className="analytics-widget-card">
      <h3 className="analytics-widget-title">
        <FaFlask /> Research Output
      </h3>
      <ul>
        <li>📑 {stats.papers} Research Papers</li>
        <li>🔑 {stats.patents} Patents Filed</li>
        <li>💰 {stats.fundedProjects} Funded Projects</li>
      </ul>
    </div>
  );
}
