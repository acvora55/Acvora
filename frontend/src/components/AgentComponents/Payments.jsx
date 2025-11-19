import React, { useEffect, useState } from "react";
import "./Payments.css";

const Payments = ({ students }) => {
  const [payments, setPayments] = useState([]);

useEffect(() => {
  if (!students) return;
  setPayments(
    students.map((student) => ({
      id: student.id,
      studentName: student.name,
      course: student.details?.course || "Not Assigned",
      email: student.email || "N/A",
      status: student.status || "Pending",
      date: new Date().toISOString().split("T")[0],
    }))
  );
}, [students]);


  const handleDownloadReceipt = (payment) => {
    const receiptContent = `
Payment Receipt
---------------
ID: ${payment.id}
Student: ${payment.studentName}
Course: ${payment.course}
Email: ${payment.email}
Status: ${payment.status}
Date: ${payment.date}
---------------`;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt_${payment.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="payments-container">
      <header className="payments-header">
        <h2 className="payments-title">Agent Panel — Payment Management</h2>
        <p className="payments-subtitle">
          Manage payment statuses, send receipts, and notify students.
        </p>
      </header>

      <div className="payment-table-wrapper">
        <table className="payments-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>Email</th>
              <th>Status</th>
              <th>Date</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>#{String(p.id).slice(-4)}</td>
                <td className="strong-text">{p.studentName}</td>
                <td>{p.course}</td>
                <td>{p.email}</td>
                <td>
                  <span className={`status-badge status-${p.status?.toLowerCase()}`}>
                    {p.status}
                  </span>
                </td>
                <td>{p.date}</td>
                <td>
                  <button
                    className="download-btn"
                    onClick={() => handleDownloadReceipt(p)}
                  >
                    ⬇
                  </button>
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
