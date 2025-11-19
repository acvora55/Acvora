import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function AdmissionsGrowth({ admissionTrend = [], compact = false }) {
  // ✅ Sample data if none is passed as prop
  const fallbackData = [
    { year: "2019", admissions: 120 },
    { year: "2020", admissions: 150 },
    { year: "2021", admissions: 180 },
    { year: "2022", admissions: 200 },
    { year: "2023", admissions: 250 },
  ];

  const chartData = admissionTrend.length > 0 ? admissionTrend : fallbackData;

  return (
    <div className="analytics-growth-card">
      <h4>Admissions Growth (Last 5 Years)</h4>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={compact ? 140 : 170}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--analytics-border)" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="admissions"
              stroke="var(--analytics-chart1)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p style={{ fontSize: "0.8rem", color: "gray" }}>
          No admissions data available
        </p>
      )}
    </div>
  );
}
