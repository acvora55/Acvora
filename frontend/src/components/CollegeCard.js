import React from "react";
import { useNavigate } from "react-router-dom";
import "./CollegeCard.css";

const CollegeCard = ({ university }) => {
  const navigate = useNavigate();

  if (!university) return null; 

 return (
    <div className="college-card">
      <div className="college-image-section">
        <img
          src={(Array.isArray(university.logo) ? university.logo[0] : university.logo) || "/placeholder.png"}
          alt={university.instituteName || "University"}
          className="college-image"
        />
        <span className="college-tag">{university.type || university.ownership || "Institute"}</span>
      </div>

      <div className="college-details">
        <h2 className="college-name">{university.instituteName || "Unnamed University"}</h2>
        <p className="college-location">
          {university.city || "Unknown"}, {university.state || ""}
        </p>

        <div className="college-info-box">
          <div className="info-item">
            ⭐ <span>Rating</span>
            <strong>{university.studentRating || "N/A"}</strong>
          </div>
          <div className="info-item">
            🏆 <span>Accreditation</span>
            <strong>{university.accreditation || "N/A"}</strong>
          </div>
          <div className="info-item">
            📘 <span>Rank</span>
            <strong>{university.nirfRank || "N/A"}</strong>
          </div>
        </div>

        <p className="college-description">
          {university.description?.slice(0, 150) || "No description available"}...
          <span className="read-more">READ MORE</span>
        </p>

        <div className="college-courses">
          {(university.popularCourses?.length
            ? university.popularCourses
            : university.courses?.map((c) => c.courseName))?.slice(0, 4)
            .map((course, idx) => (
              <span key={idx} className="course-pill">
                {course}
              </span>
            ))}
        </div>

        <div className="card-buttons">
          <button className="counselling-btn">Get Counselling</button>
          <button
            className="explore-btn"
            onClick={() => navigate(`/university-page/${university._id}`)}
          >
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
