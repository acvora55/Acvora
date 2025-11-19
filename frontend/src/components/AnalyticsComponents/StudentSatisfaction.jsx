import React from "react";
import { FaSmile } from "react-icons/fa";

export default function StudentSatisfaction({ satisfaction }) {
  // ✅ Provide fallback sample values
  const stats = satisfaction || {
    rating: 4.3,
    totalReviews: 1280,
  };

  return (
    <div className="analytics-widget-card">
      <h3 className="analytics-widget-title">
        <FaSmile /> Student Satisfaction
      </h3>
      <p>
        ⭐ {stats.rating}/5 ({stats.totalReviews} reviews)
      </p>
      <progress
        value={stats.rating}
        max="5"
        style={{ width: "100%" }}
      />
    </div>
  );
}
