import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import "./Gallery.css";

const API_BASE = import.meta?.env?.VITE_API_BASE || "https://acvora-1.onrender.com";

// helper to build correct image URL
const getImageUrl = (src) => {
  if (!src) return "";
  const clean = src.replace(/\\/g, "/"); // normalize backslashes if any
  return clean.startsWith("http") ? clean : `${API_BASE}/${clean}`;
};

const Gallery = ({ universityId, darkMode }) => {
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showMoreInfra, setShowMoreInfra] = useState(false);
  const [showMoreEvents, setShowMoreEvents] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch gallery data from backend
  useEffect(() => {
    if (!universityId) return;

    const fetchGallery = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/universities/${universityId}/gallery`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || "Failed to fetch gallery");

        setGallery(data.gallery || {});
      } catch (err) {
        console.error("❌ Error fetching gallery:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [universityId]);

  if (loading) return <div className="p-6 text-center">Loading gallery…</div>;
  if (error)
    return (
      <div className="p-6 text-center text-red-500">Error: {error}</div>
    );

  const infraImages = gallery?.infraPhotos || [];
  const eventImages = gallery?.eventPhotos || [];
  const otherImages = gallery?.otherPhotos || [];

  const visibleInfraImages = showMoreInfra ? infraImages : infraImages.slice(0, 4);
  const visibleEventImages = showMoreEvents ? eventImages : eventImages.slice(0, 4);

  return (
    <div className={`gallery-layout ${darkMode ? "dark" : ""}`}>
      <div className="gallery-main">
        {/* Infrastructure Section */}
        <section className="gallery-section">
          <h2 className="heading">University Infrastructure Gallery</h2>
          {infraImages.length === 0 ? (
            <p className="text-gray-400">No infrastructure images available.</p>
          ) : (
            <div className="image-layout">
              {visibleInfraImages.map((src, index) => (
                <div
                  key={`infra-${index}`}
                  className={`image-item ${index === 0 ? "main-image" : ""}`}
                >
                  <img
                    src={getImageUrl(src)}
                    alt={`Infrastructure ${index + 1}`}
                  />
                  <button
                    className="preview-btn"
                    onClick={() => setPreviewImage(getImageUrl(src))}
                  >
                    <FaEye />
                  </button>
                </div>
              ))}
              {infraImages.length > 4 && (
                <div
                  className="image-item show-more-item"
                  onClick={() => setShowMoreInfra(!showMoreInfra)}
                >
                  {showMoreInfra ? "Show less" : "Show more"}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Events Section */}
        <section className="gallery-section">
          <h2 className="heading">Events Gallery</h2>
          {eventImages.length === 0 ? (
            <p className="text-gray-400">No event images available.</p>
          ) : (
            <div className="image-layout">
              {visibleEventImages.map((src, index) => (
                <div
                  key={`event-${index}`}
                  className={`image-item ${index === 0 ? "main-image" : ""}`}
                >
                  <img
                    src={getImageUrl(src)}
                    alt={`Event ${index + 1}`}
                  />
                  <button
                    className="preview-btn"
                    onClick={() => setPreviewImage(getImageUrl(src))}
                  >
                    <FaEye />
                  </button>
                </div>
              ))}
              {eventImages.length > 4 && (
                <div
                  className="image-item show-more-item"
                  onClick={() => setShowMoreEvents(!showMoreEvents)}
                >
                  {showMoreEvents ? "Show less" : "Show more"}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Other Images Section */}
        {otherImages.length > 0 && (
          <section className="gallery-section">
            <h2 className="heading">Other Photos</h2>
            <div className="image-layout">
              {otherImages.map((src, index) => (
                <div key={`other-${index}`} className="image-item">
                  <img
                    src={getImageUrl(src)}
                    alt={`Other ${index + 1}`}
                  />
                  <button
                    className="preview-btn"
                    onClick={() => setPreviewImage(getImageUrl(src))}
                  >
                    <FaEye />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Preview Modal */}
        {previewImage && (
          <div
            className="preview-modal"
            onClick={() => setPreviewImage(null)}
          >
            <img src={previewImage} alt="Preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
