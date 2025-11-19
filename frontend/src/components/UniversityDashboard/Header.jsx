import React from "react";
import { FaBell, FaEnvelope, FaMoon, FaSun } from "react-icons/fa";
import "./Header.css";
export default function Header({ sidebarOpen, setSidebarOpen, search, setSearch, theme, toggleTheme }) {
  const darkMode = theme === "dark";

  return (
    <header className="ud-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div className="ud-header-left" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <button
          className="ud-icon-btn ud-sidebar-toggle"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Open sidebar"}
          onClick={() => setSidebarOpen((s) => !s)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
            {sidebarOpen ? (
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>

        <div className="ud-search">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dashboard..."
            aria-label="Search dashboard"
          />
        </div>
      </div>

      <div
        className="ud-header-center"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexGrow: 1,
          justifyContent: "center",
          userSelect: "none",
        }}
      >
        <img
          src="https://marketplace.canva.com/EAGSIcoid00/1/0/1600w/canva-blue-white-modern-school-logo-ZBxBTP6Lc-E.jpg"
          alt="Logo"
          style={{ height: "32px", objectFit: "contain" }}
        />
        <span
          style={{
            fontWeight: "700",
            fontSize: "1.25rem",
            color: darkMode ? "#f3f4f6" : "#111827",
          }}
        >
          Uni Hub
        </span>
      </div>

      <div className="ud-header-right" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <button
          className="ud-icon-btn"
          title="Notifications"
          aria-haspopup="true"
          onClick={() => alert("Open notifications panel (placeholder)")}
        >
          <FaBell size={18} />
        </button>

        <button
          className="ud-icon-btn"
          title="Messages"
          onClick={() => alert("Open messages (placeholder)")}
        >
          <FaEnvelope size={18} />
        </button>

        <button
          className="ud-icon-btn ud-theme-toggle"
          onClick={toggleTheme}
          aria-pressed={darkMode}
          title="Toggle dark / light theme"
        >
          {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        <div className="ud-profile" title="Admin profile">
          <div className="ud-avatar" aria-hidden>
            AD
          </div>
        </div>
      </div>
    </header>
  );
}
