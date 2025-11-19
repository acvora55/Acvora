import React from "react";
import "./WelcomeBanner.css";

export default function WelcomeBanner() {
  return (
    <section className="ud-card ud-welcome">
      <div className="ud-welcome-left">
        <h2>Welcome back, Admin 👋</h2>
        <p>Complete your profile to increase discoverability</p>
        <div className="ud-progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="60">
          <div className="ud-progress-bar" style={{ width: "60%" }} />
        </div>
      </div>
      <div className="ud-welcome-right">
        <button className="ud-btn">Complete profile</button>
      </div>
    </section>
  );
}
