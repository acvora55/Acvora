import React from "react";
import { FaBell, FaEnvelope, FaMoon, FaSun } from "react-icons/fa";
import "./Header.css";

export default function Header({
  sidebarOpen,
  setSidebarOpen,
  search,
  setSearch,
  theme,
  toggleTheme,
}) {
  const darkMode = theme === "dark";

  return (
    <header className="ad-header">
      {}
      <div className="ad-header-left">
        <button
          className="ad-icon-btn ad-sidebar-toggle"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Open sidebar"}
          onClick={() => setSidebarOpen((s) => !s)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
            {sidebarOpen ? (
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>

        <div className="ad-search">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search agents, students..."
            aria-label="Search agent dashboard"
          />
        </div>
      </div>

      {/* Center: Logo + Title */}
      <div className="ad-header-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Agent Dashboard Logo"
          className="ad-logo"
        />
        <span className="ad-title">Agent Hub</span>
      </div>

      {/* Right: Actions */}
      <div className="ad-header-right">
        <button
          className="ad-icon-btn"
          title="Notifications"
          onClick={() => alert("Open notifications (placeholder)")}
        >
          <FaBell size={18} />
        </button>

        <button
          className="ad-icon-btn"
          title="Messages"
          onClick={() => alert("Open messages (placeholder)")}
        >
          <FaEnvelope size={18} />
        </button>

        <button
          className="ad-icon-btn ad-theme-toggle"
          onClick={toggleTheme}
          aria-pressed={darkMode}
          title="Toggle theme"
        >
          {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        <div className="ad-profile" title="Agent profile">
          <div className="ad-avatar">AG</div>
        </div>
      </div>
    </header>
  );
}
