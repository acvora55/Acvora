import React from "react";
import "./Sidebar.css";

const MENU = [
  { id: "dashboard", label: "Dashboard" },
  { id: "PartnerInstitutes", label: "Partner Institutes" },
  { id: "students", label: "Students" },
  { id: "Applications", label: "Applications" },
  { id: "Payments", label: "Payments & Receipts" },
  { id: "commission-wallet", label: "Commission Wallet" },
  { id: "reports", label: "Reports & Analytics" },
  { id: "Announcements", label: "Announcements" },
  { id: "Support", label: "Support" },
  { id: "Settings", label: "Settings" },
];

export default function Sidebar({ sidebarOpen, setRoute, currentRoute }) {
  return (
    <aside className={`ad-sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <div
        className="ad-brand"
        onClick={() => setRoute("dashboard")}
        style={{ cursor: "pointer" }}
      >
        <div className="ad-brand-text">
          <strong>Agent Panel</strong>
          <small>Admin</small>
        </div>
      </div>

      <nav className="ad-menu">
        {MENU.map(({ id, label }) => (
          <button
            key={id}
            className={`ad-menu-item ${currentRoute === id ? "active" : ""}`}
            onClick={() => setRoute(id)}
          >
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="ad-sidebar-footer">
        <small>Support • Help Docs • Contact</small>
      </div>
    </aside>
  );
}
