import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reports.css';

const Reports = () => {
  const [filter, setFilter] = useState('All'); 
  const [reports, setReports] = useState([]); // dynamic data from backend

  const metrics = [
    { label: 'Total Applications', value: reports.length },
    { label: 'Admissions Confirmed', value: reports.filter(r => r.applicationStatus === 'Approved').length },
    { label: 'Total Commissions ($)', value: reports.reduce((sum, r) => sum + (r.commission || 0), 0) },
    { label: 'Pending Payments', value: reports.filter(r => r.paymentStatus === 'Pending').length },
  ];

  // Fetch reports from backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('https://acvora-1.onrender.com/api/students'); // adjust your endpoint
        const formattedReports = res.data.map(student => ({
          id: student.id,
          student: student.name,
          course: student.details?.course || 'Not Assigned',
          applicationStatus: student.status || 'Pending',
          paymentStatus: student.paymentStatus || 'Pending',
          commission: student.commission || 0,
          date: student.date || new Date().toISOString().split('T')[0],
        }));
        setReports(formattedReports);
      } catch (err) {
        console.error('Error fetching reports:', err);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = filter === 'All' 
    ? reports 
    : reports.filter(report => report.applicationStatus === filter);

  return (
    <div className="reports-container">
      <h1 className="page-title">Agent Panel - Reports & Analytics</h1>

      {/* Metrics Summary */}
      <div className="reports-metrics">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Controls */}
      <div className="filter-controls">
        <h2 className="section-title">Detailed Reports</h2>
        <select 
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Applications</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Reports Table */}
      <div className="table-wrapper">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Student</th>
              <th>Course</th>
              <th>Application Status</th>
              <th>Payment Status</th>
              <th>Commission ($)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length > 0 ? (
              filteredReports.map(report => (
                <tr key={report.id}>
  <td>#{String(report.id).slice(-4)}</td> {/* or use {report.id} */}
  <td>{report.student}</td>
  <td>{report.course}</td>
  <td>
    <span className={`status-badge ${report.applicationStatus.toLowerCase()}`}>
      {report.applicationStatus}
    </span>
  </td>
  <td>{report.paymentStatus}</td>
  <td>{report.commission.toFixed(2)}</td>
  <td>{report.date}</td>
</tr>

              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>
                  No reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
