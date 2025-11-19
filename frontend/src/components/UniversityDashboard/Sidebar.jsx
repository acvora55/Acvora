import React from "react";
import "./Sidebar.css";

const MENU = [
  { id: "dashboard", label: "Dashboard" },
  { id: "My Profile", label: "My Profile" },
  { id: "Courses & Fees", label: "Courses & Fees" },
  { id: "News", label: "News" },
  { id: "Applications", label: "Applications" },
  { id: "Gallery", label: "Gallery" },
  { id: "analytics", label: "Analytics" },
  { id: "Subscription", label: "Subscription" },
  { id: "settings", label: "Settings" },
  { id: "scholarship", label: "View Scholarships" },
  { id: "addscholarship", label: "Add Scholarship" },
  { id: "removescholarship", label: "Remove Scholarship" },
  { id: "scholarshipanalytics", label: "Scholarship Analytics" },
];

export default function Sidebar({ sidebarOpen, setRoute, currentRoute }) {
  return (
    <aside className={`ud-sidebar ${sidebarOpen ? "open" : "closed"}`} aria-label="Primary navigation">
      <div
        className="ud-brand"
        onClick={() => setRoute("dashboard")}
        style={{ cursor: "pointer" }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setRoute("dashboard")}
      >
        <div className="ud-brand-text">
          <strong>University Dashboard</strong>
          <small>Admin</small>
        </div>
      </div>

      <nav className="ud-menu" role="menu">
        {MENU.map(({ id, label }) => (
          <button
            key={id}
            className={`ud-menu-item ${currentRoute === id ? "active" : ""}`}
            onClick={() => setRoute(id)}
            role="menuitem"
            aria-current={currentRoute === id ? "page" : undefined}
          >
            <span className="ud-menu-label">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}