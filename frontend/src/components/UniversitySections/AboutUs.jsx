import React, { useState, useEffect, useMemo } from "react";
import "./Aboutus.css";

const API_BASE = import.meta?.env?.VITE_API_BASE || "https://acvora-1.onrender.com";

const getImageUrl = (src) => {
  if (!src) return "";
  const clean = src.replace(/\\/g, "/");
  return clean.startsWith("http") ? clean : `${API_BASE}/${clean}`;
};

const AboutUs = ({ university }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Collect only aboutImages (max 5)
  const images = useMemo(() => {
    if (!university) return [];
    return (university.aboutImages || []).slice(0, 5);
  }, [university]);

  // Auto-slide
  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);

  if (!university) {
    return <p className="p-4">Loading About Us...</p>;
  }

  return (
    <div className="about-us-container">
      {/* Left Side: About Content */}
      <div className="about-us-content">
        <h2 className="about-us-title">About {university.instituteName}</h2>
        <p className="about-us-description">{university.description}</p>
      </div>

      {/* Right Side: Image Carousel */}
      <div className="about-us-image">
        {images.length > 0 ? (
          <div className="image-carousel">
            <div
              className="carousel-images"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {images.map((src, index) => (
                <img
                  key={index}
                  src={getImageUrl(src)}
                  alt={`About Slide ${index + 1}`}
                  className="carousel-image"
                />
              ))}
            </div>
            <div className="carousel-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`indicator ${
                    currentSlide === index ? "active" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
