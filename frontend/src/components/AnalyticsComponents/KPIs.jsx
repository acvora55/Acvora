import React from "react";
import {
  FaUniversity,
  FaUserGraduate,
  FaUsers,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";

export default function KPIs({ kpis }) {
  if (!kpis) {
    return (
      <div className="analytics-kpi-grid">
        <p style={{ color: "gray", fontSize: "0.85rem" }}>
          No KPI data available
        </p>
      </div>
    );
  }

  return (
    <div className="analytics-kpi-grid">
      <div className="analytics-kpi-card">
        <FaUniversity className="analytics-kpi-icon" />
        <h3>{kpis.applications?.toLocaleString() || "-"}</h3>
        <p>Applications</p>
      </div>

      <div className="analytics-kpi-card">
        <FaUserGraduate className="analytics-kpi-icon" />
        <h3>{kpis.admissions?.toLocaleString() || "-"}</h3>
        <p>
          Admissions (
          {kpis.applications
            ? Math.round((kpis.admissions / kpis.applications) * 100)
            : 0}
          %)
        </p>
      </div>

      <div className="analytics-kpi-card">
        <FaUsers className="analytics-kpi-icon" />
        <h3>{kpis.retention ?? "-"}</h3>
        <p>Retention Rate</p>
      </div>

      <div className="analytics-kpi-card">
        <FaBriefcase className="analytics-kpi-icon" />
        <h3>{kpis.placement ?? "-"}</h3>
        <p>Placement • Avg {kpis.avgSalary || "-"}</p>
      </div>

      <div className="analytics-kpi-card">
        <FaGraduationCap className="analytics-kpi-icon" />
        <h3>{kpis.facStuRatio || "-"}</h3>
        <p>Faculty–Student Ratio</p>
      </div>
    </div>
  );
}
