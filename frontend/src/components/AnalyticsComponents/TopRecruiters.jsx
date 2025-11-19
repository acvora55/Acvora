import React from "react";
import { FaBriefcase, FaLock } from "react-icons/fa";

export default function TopRecruiters({ recruiterLogos = [], subscribed }) {
  // fallback logos if none passed
  const defaultLogos = [
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Google_Logo.svg",
  ];

  const logos = recruiterLogos.length ? recruiterLogos : defaultLogos;

  return (
    <div
      className={`analytics-widget-card premium-widget ${
        !subscribed ? "locked" : ""
      }`}
    >
      <h3 className="analytics-widget-title">
        <FaBriefcase /> Top Recruiters
      </h3>

      <div className="recruiters-grid">
        {logos.map((logo, i) => (
          <div key={i} className="recruiter-logo">
            <img src={logo} alt={`Recruiter ${i + 1}`} />
          </div>
        ))}
      </div>

      {!subscribed && (
        <div className="premium-overlay">
          <FaLock className="lock-icon" />{" "}
          <span>Upgrade to view recruiters</span>
        </div>
      )}
    </div>
  );
}
