import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function ApplicationsVsAdmissions({ monthlyApps = [], compact = false }) {
  // ✅ Sample fallback dataset
  const fallbackData = [
    { month: "Jan", applications: 320, admissions: 120 },
    { month: "Feb", applications: 280, admissions: 100 },
    { month: "Mar", applications: 350, admissions: 150 },
    { month: "Apr", applications: 400, admissions: 180 },
    { month: "May", applications: 420, admissions: 200 },
    { month: "Jun", applications: 390, admissions: 170 },
    { month: "Jul", applications: 450, admissions: 220 },
    { month: "Aug", applications: 470, admissions: 240 },
    { month: "Sep", applications: 430, admissions: 210 },
    { month: "Oct", applications: 410, admissions: 190 },
    { month: "Nov", applications: 380, admissions: 160 },
    { month: "Dec", applications: 360, admissions: 150 },
  ];

  const chartData = monthlyApps.length > 0 ? monthlyApps : fallbackData;

  return (
    <div className="analytics-apps-card">
      <h4>Applications vs Admissions (This Year)</h4>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={compact ? 140 : 170}>
          <BarChart data={chartData} className="analytics-histogram">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--analytics-border)" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="applications" fill="var(--analytics-histogram)" />
            <Bar dataKey="admissions" fill="var(--analytics-chart2)" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p style={{ fontSize: "0.8rem", color: "gray" }}>
          No applications data available
        </p>
      )}
    </div>
  );
}
