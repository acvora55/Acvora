import React, { useState } from "react";
import axios from "axios";
import "./Applications.css";

const Applications = ({ students, setStudents, addPayment }) => {
  const [paymentModal, setPaymentModal] = useState({ open: false, appId: null, selectedMethod: null });
  const [viewModal, setViewModal] = useState({ open: false, student: null });

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`https://acvora-07fo.onrender.com/api/students/${id}`, { status });
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const openPaymentModal = (appId) => setPaymentModal({ open: true, appId, selectedMethod: null });
  const closePaymentModal = () => setPaymentModal({ open: false, appId: null, selectedMethod: null });
  const selectMethod = (method) => setPaymentModal((prev) => ({ ...prev, selectedMethod: method }));

  const proceedPayment = () => {
    const { appId, selectedMethod } = paymentModal;
    if (!selectedMethod) return;

    const app = students.find((s) => s.id === appId);
    if (!app) return;

    addPayment({
      studentName: app.name,
      course: app.details?.course,
      amount: 5000,
      status: "Pending",
      email: app.email,
    });

    alert(`Payment via ${selectedMethod.toUpperCase()} for Application ID: ${appId}`);
    closePaymentModal();
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">Agent Panel — Student Applications</h1>
        <p className="app-subtitle">Manage approvals and collect fees easily.</p>
      </div>

      <div className="app-table-card">
        <div className="app-table-scroll">
          <table className="app-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Course</th>
                <th>University</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>#{s.id?.slice(-4)}</td>
                  <td className="app-strong">{s.name}</td>
                  <td>{s.details?.course || "Not Assigned"}</td>
                  <td>{s.university || "Not Assigned"}</td>
                  <td>
                    <select
                      value={s.status}
                      onChange={(e) => handleStatusChange(s.id, e.target.value)}
                      className="app-select"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td>{new Date(s.createdAt).toISOString().split("T")[0]}</td>
                  <td>
                    <div className="app-actions">
                      <button className="btn btn-blue" onClick={() => openPaymentModal(s.id)}>Pay</button>
                      <button className="btn btn-yellow" onClick={() => setViewModal({ open: true, student: s })}>View</button>
                    </div>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>No applications found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {paymentModal.open && (
        <div className="app-modal-overlay" onClick={closePaymentModal}>
          <div className="app-modal" onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-header">
              <h2 className="app-modal-title">Choose Payment Method</h2>
              <button className="app-close" onClick={closePaymentModal}>×</button>
            </div>
            <div className="app-modal-body">
              <div className="app-method-grid">
                {["bank", "upi", "paypal", "netbanking"].map((m) => (
                  <button
                    key={m}
                    className={`app-method ${paymentModal.selectedMethod === m ? "active" : ""}`}
                    onClick={() => selectMethod(m)}
                  >
                    {m.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="app-modal-footer">
              <button className="btn btn-gray" onClick={closePaymentModal}>Cancel</button>
              <button className="btn btn-blue" onClick={proceedPayment} disabled={!paymentModal.selectedMethod}>Proceed</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModal.open && viewModal.student && (
        <div className="app-modal-overlay" onClick={() => setViewModal({ open: false, student: null })}>
          <div className="app-modal view" onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-body">
              <h3>Student Details</h3>
              <p><strong>Name:</strong> {viewModal.student.name}</p>
              <p><strong>Email:</strong> {viewModal.student.email}</p>
              <p><strong>Course:</strong> {viewModal.student.details?.course || "N/A"}</p>
              <p><strong>University:</strong> {viewModal.student.university || "N/A"}</p>
            </div>
            <div className="app-modal-footer">
              <button className="btn btn-gray" onClick={() => setViewModal({ open: false, student: null })}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
