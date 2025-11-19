import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Settings.css"; // Import CSS

export default function Settings() {
  const location = useLocation();

  return (
    <div className="sett-container">
      {/* Sidebar */}
      <Sidebar location={location} />

      {/* Main Content */}
      <div className="sett-main">
        <div className="sett-inner container">
          <div className="sett-header">
            <h1 className="sett-title">Settings</h1>
            <p className="sett-subtitle">
              Configure your application settings.
            </p>
          </div>

          <div className="sett-card">
            <h2 className="sett-card-title">Application Settings</h2>
            <p className="sett-card-desc">
              This page will allow you to configure application settings such as notifications, themes, and more. (Placeholder for settings functionality)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
