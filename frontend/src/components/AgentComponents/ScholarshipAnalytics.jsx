import React from "react";
import { useLocation } from "react-router-dom";
import { FaUserGraduate, FaTasks, FaCheckCircle, FaBell } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "./ScholarshipAnalytics.css";

export default function ScholarshipAnalytics() {
  const location = useLocation();

  // Dummy data for metrics
  const metrics = [
    { title: "Total Scholarships", value: 124, icon: <FaUserGraduate /> },
    { title: "Pending Approvals", value: 12, icon: <FaTasks /> },
    { title: "Approved", value: 95, icon: <FaCheckCircle /> },
    { title: "Notifications", value: 5, icon: <FaBell /> },
  ];

  // Pie chart data
  const pieData = [
    { name: "Approved", value: 95, color: "#4F46E5" },
    { name: "Pending", value: 12, color: "#F59E0B" },
    { name: "Rejected", value: 17, color: "#EF4444" },
  ];

  // Bar chart data
  const barData = [
    { month: "Jan", applications: 20 },
    { month: "Feb", applications: 35 },
    { month: "Mar", applications: 50 },
    { month: "Apr", applications: 30 },
    { month: "May", applications: 40 },
  ];

  return (
    <div className="ad-scholarship-analytics-container">
      <div className="ad-scholarship-analytics-main">
        <div className="ad-scholarship-analytics-inner">
          {/* Header */}
          <div className="ad-scholarship-analytics-header">
            <h1 className="ad-scholarship-analytics-title">Scholarship Analytics</h1>
            <p className="ad-scholarship-analytics-subtitle">
              Welcome to the Scholarship Analytics Dashboard.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="ad-scholarship-analytics-metrics-grid">
            {metrics.map((metric, idx) => (
              <div key={idx} className="ad-scholarship-analytics-metric-card">
                <div className="ad-scholarship-analytics-metric-icon">{metric.icon}</div>
                <div>
                  <p className="ad-scholarship-analytics-metric-title">{metric.title}</p>
                  <p className="ad-scholarship-analytics-metric-value">{metric.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scholarship Status Card */}
          <div className="ad-scholarship-analytics-card">
            <h2 className="ad-scholarship-analytics-card-title">Scholarship Status</h2>

            <div className="ad-scholarship-analytics-status-charts">
              {/* Pie Chart */}
              <div className="ad-scholarship-analytics-status-chart">
                <h3 className="ad-scholarship-analytics-status-chart-title">Overall Status</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label={(entry) => entry.name}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="ad-scholarship-analytics-legend">
                  {pieData.map((entry, index) => (
                    <span key={index} style={{ color: entry.color }}>
                      {entry.name}: {entry.value}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bar Chart */}
              <div className="ad-scholarship-analytics-status-chart">
                <h3 className="ad-scholarship-analytics-status-chart-title">
                  Applications per Month
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="applications" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <p className="ad-scholarship-analytics-chart-note">
                  Number of applications submitted each month
                </p>
              </div>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="ad-scholarship-analytics-card">
            <h2 className="ad-scholarship-analytics-card-title">Recent Applications</h2>
            <div className="ad-scholarship-analytics-table-wrapper">
              <table className="ad-scholarship-analytics-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Scholarship</th>
                    <th>Status</th>
                    <th>Submitted On</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>Merit Scholarship</td>
                    <td className="ad-approved">Approved</td>
                    <td>2025-09-15</td>
                  </tr>
                  <tr>
                    <td>Jane Smith</td>
                    <td>Need-Based Scholarship</td>
                    <td className="ad-pending">Pending</td>
                    <td>2025-09-14</td>
                  </tr>
                  <tr>
                    <td>Alice Johnson</td>
                    <td>Merit Scholarship</td>
                    <td className="ad-rejected">Rejected</td>
                    <td>2025-09-13</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
