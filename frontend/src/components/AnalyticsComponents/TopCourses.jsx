import React from "react";
import { FaGraduationCap } from "react-icons/fa";

export default function TopCourses({ courses }) {
  // fallback to defaults if no data passed
  const defaultCourses = [
    "Computer Science — 1,200",
    "Business Administration — 950",
    "Mechanical Engineering — 800",
    "Psychology — 600",
  ];

  const data = courses && courses.length ? courses : defaultCourses;

  return (
    <div className="analytics-widget-card">
      <h3 className="analytics-widget-title">
        <FaGraduationCap /> Top Courses
      </h3>
      <ul>
        {data.map((c, i) => (
          <li key={i}>
            <span className="analytics-dot" /> {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
