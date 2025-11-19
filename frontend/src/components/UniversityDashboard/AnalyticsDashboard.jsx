import React, { useState } from "react";
import "./AnalyticsDashboard.css";

// Core KPIs & charts
import KPIs from "../../components/AnalyticsComponents/KPIs";
import AdmissionsGrowth from "../../components/AnalyticsComponents/AdmissionsGrowth";
import ApplicationsVsAdmissions from "../../components/AnalyticsComponents/ApplicationsVsAdmissions";
import FacilitiesUsage from "../../components/AnalyticsComponents/FacilitiesUsage";
import Financials from "../../components/AnalyticsComponents/Financials";
import Placements from "../../components/AnalyticsComponents/Placements";

// Widgets
import Widgets from "../../components/AnalyticsComponents/Widgets";
import Demographics from "../../components/AnalyticsComponents/Demographics";
import CampusEvents from "../../components/AnalyticsComponents/CampusEvents";
import CompetitorData from "../../components/AnalyticsComponents/CompetitorData";
import Deadlines from "../../components/AnalyticsComponents/Deadlines";
import FinancialAid from "../../components/AnalyticsComponents/FinancialAid";
import HostelAnalytics from "../../components/AnalyticsComponents/HostelAnalytics";
import LibraryUsage from "../../components/AnalyticsComponents/LibraryUsage";
import LocationInsights from "../../components/AnalyticsComponents/LocationInsights";
import ResearchOutput from "../../components/AnalyticsComponents/ResearchOutput";
import SportsAnalytics from "../../components/AnalyticsComponents/SportsAnalytics";
import StudentSatisfaction from "../../components/AnalyticsComponents/StudentSatisfaction";
import TopCourses from "../../components/AnalyticsComponents/TopCourses";
import TopRecruiters from "../../components/AnalyticsComponents/TopRecruiters";

export default function AnalyticsDashboard() {
  const [compact, setCompact] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  // Dummy KPI data
  const kpis = {
    applications: 12500,
    admissions: 8200,
    retention: 88,
    placement: 92,
    avgSalary: "₹6.5 LPA",
    facStuRatio: "1:18",
    goal: 12000,
    currentEnrollment: 9240,
  };

  return (
    <div className="analytics-dashboard-container">
      {/* ===== Header ===== */}
      <div className="analytics-dashboard-header">
        <h2>
          🎓 University Analytics —{" "}
          <span className="version-label">
            {subscribed ? " Full Suite" : " Lite Version"}
          </span>
        </h2>
        <div className="header-actions">
          <button
            className="analytics-dashboard-toggle"
            onClick={() => setCompact(!compact)}
          >
            {compact ? "Comfortable" : "Compact"}
          </button>
          <button
            className={`analytics-dashboard-subscribe ${
              subscribed ? "active" : ""
            }`}
            onClick={() => setSubscribed(!subscribed)}
          >
            {subscribed ? "Premium Active" : "Upgrade to Premium"}
          </button>
        </div>
      </div>

      {/* ===== KPI CARDS ===== */}
      <KPIs kpis={kpis} />

      {/* ===== Main Charts ===== */}
      <div className="analytics-main-grid">
        <AdmissionsGrowth compact={compact} />
        <ApplicationsVsAdmissions compact={compact} />
        <FacilitiesUsage subscribed={subscribed} />
        <Financials />
        <Placements subscribed={subscribed} />
        <TopCourses />
        <TopRecruiters subscribed={subscribed} />
        <Demographics />
      </div>

      {/* ===== Widgets Section ===== */}
      <div className="analytics-widgets-section">
        <CompetitorData subscribed={subscribed} />
        <LocationInsights subscribed={subscribed} />
        <ResearchOutput />
        <SportsAnalytics />
        <LibraryUsage />
        <HostelAnalytics />
        <StudentSatisfaction />
        <FinancialAid />
        <Deadlines />
        <CampusEvents />
        <Widgets subscribed={subscribed} />
      </div>
    </div>
  );
}
