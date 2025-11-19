// ExploreCollegesPage.js
import React, { useEffect, useState } from "react";
import CollegeCard from "../components/CollegeCard";

const ExploreCollegesPage = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    fetch("https://acvora-1.onrender.com/api/colleges") // backend URL
      .then((res) => res.json())
      .then((data) => setColleges(data))
      .catch((err) => console.error("Error fetching colleges:", err));
  }, []);

  return (
    <div className="explore-colleges">
      {colleges.length > 0 ? (
        colleges.map((college) => (
          <CollegeCard key={college._id} college={college} />
        ))
      ) : (
        <p>No colleges available.</p>
      )}
    </div>
  );
};

export default ExploreCollegesPage;
