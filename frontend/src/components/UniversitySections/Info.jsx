import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faBriefcase,
  faUsers,
  faHome,
  faUniversity,
  faStar,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import "./Info.css";
import { applyTheme } from "../../utils/themeUtils";

const Info = ({ university }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  if (!university) {
    return <p className="p-4">Loading Info...</p>;
  }

  const formatList = (value) => {
    if (!value) return "N/A";
    if (Array.isArray(value)) return value.join(", ");
    return value.split(",").map((i) => i.trim()).join(", ");
  };

  const items = [
    {
      icon: faMapMarkerAlt,
      title: "Location",
      value: `${university.city || "N/A"}, ${university.state || ""}`,
    },
    { icon: faBriefcase, title: "Highest Package", value: university.highestPackage || "N/A" },
    { icon: faBriefcase, title: "Average Package", value: university.avgPackage || "N/A" },
    { icon: faUsers, title: "Students", value: university.students || "N/A" },
    { icon: faHome, title: "Hostel Fees", value: university.hostelFee || "N/A" },
    { icon: faUniversity, title: "NIRF Rank", value: university.nirfRank || "N/A" },
    { icon: faBriefcase, title: "Top Recruiters", value: formatList(university.topRecruiters) },
    { icon: faGraduationCap, title: "Popular Courses", value: formatList(university.popularCourses) },
    { icon: faUniversity, title: "Campus Size", value: university.campusSize || "N/A" },
    { icon: faStar, title: "Student Rating", value: university.studentRating || "N/A" },
  ];

  return (
    <div className="info-two-col-container">
      <h2 className="info-title">{university.instituteName} Details</h2>
      <div className="info-grid">
        {items.map((item, idx) => (
          <div key={idx} className="info-block">
            <FontAwesomeIcon icon={item.icon} className="info-icon" />
            <div className="info-text">
              <h4>{item.title}</h4>
              <p>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;
