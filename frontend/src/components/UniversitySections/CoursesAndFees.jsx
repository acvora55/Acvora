import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./CoursesAndFees.css";

const CoursesAndFees = ({ universityId }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Theme listener
    const handleThemeChange = () => {
      setDarkMode(document.documentElement.classList.contains("dark"));
    };
    window.addEventListener("themeChange", handleThemeChange);
    return () => window.removeEventListener("themeChange", handleThemeChange);
  }, []);

  useEffect(() => {
    // Fetch courses from backend
    const fetchCourses = async () => {
      try {
        const res = await fetch(`/api/universities/${universityId}/courses`);
        const data = await res.json();

        console.log("📌 Fetched University Data:", data);

        if (data.courses && Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else {
          setCourses([]);
        }
      } catch (err) {
        console.error("❌ Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [universityId]);

  if (loading) {
    return <p className="uni-courses-loading">Loading courses...</p>;
  }

  return (
    <div className={`uni-courses-container ${darkMode ? "dark" : ""}`}>
      <h2 className="uni-courses-title">Courses & Fees</h2>
      <div className="uni-courses-table-wrapper">
        <table className="uni-courses-table">
          <thead>
            <tr className="uni-courses-header">
              <th className="uni-courses-th">Course Name</th>
              <th className="uni-courses-th">Total Fees</th>
              <th className="uni-courses-th">Yearly Fees</th>
              <th className="uni-courses-th">Duration</th>
              <th className="uni-courses-th">Intake</th>
              <th className="uni-courses-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <tr
                  key={index}
                  className={`uni-courses-row ${
                    index === hoveredIndex ? "uni-courses-highlight-row" : ""
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <td className="uni-courses-td">{course.courseName}</td>
                  <td className="uni-courses-td">{course.totalFees}</td>
                  <td className="uni-courses-td">{course.yearlyFees}</td>
                  <td className="uni-courses-td">{course.duration}</td>
                  <td className="uni-courses-td">{course.intake}</td>
                  <td className="uni-courses-td">
                    <a
                      href={course.applyLink || "#"}
                      className="uni-courses-apply-button"
                      aria-label={`Apply for ${course.courseName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Apply</span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="uni-courses-td uni-courses-no-data">
                  No courses available for this university.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesAndFees;
