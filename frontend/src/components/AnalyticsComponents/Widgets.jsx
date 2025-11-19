import React from "react";
import { FaGraduationCap } from "react-icons/fa";

export default function TopCourses({ courses }) {
  // Default fallback data
  const defaultCourses = [
    "Computer Science — 1,200",
    "Business Administration — 950",
    "Mechanical Engineering — 800",
    "Psychology — 600",
  ];

  const courseList = courses && courses.length ? courses : defaultCourses;

  return (
    <div className="analytics-widget-card">
      <h3 className="analytics-widget-title">
        <FaGraduationCap /> Top Courses
      </h3>
      <ul>
        {courseList.map((c, i) => (
          <li key={i}>
            <span
              className="analytics-dot"
              aria-label="course indicator"
            />{" "}
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
