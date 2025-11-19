import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CollegeCardItem.css'; // Assuming you have a CSS file for styling

const CollegeCardItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="college-card-container">
      <div className="college-card-content">
        <img src={item.image} alt={item.name} className="college-image" />
        <div className="college-info">
          <h3 className="college-name">{item.name}</h3>
          <p className="college-location">{item.location}</p>
          <div className="college-details">
            <span className="rating">⭐ {item.rating}</span>
            <span className="accreditation">🎓 {item.accreditation}</span>
            <span className="exams">📝 {item.exams}</span>
          </div>
          <p className="college-description">{item.description}</p>
          <div className="college-programs">
            {item.programs && item.programs.map((program, index) => (
              <span key={index} className="program">{program}</span>
            ))}
          </div>
          <div className="college-buttons">
            <button className="get-counseling-btn" onClick={() => navigate(`/counseling/${item.id}`)}>Get Counseling</button>
            <button className="explore-now-btn" onClick={() => navigate(`/explore/${item.id}`)}>Explore Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeCardItem;