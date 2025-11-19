import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faEdit, faUpload, faDownload } from "@fortawesome/free-solid-svg-icons";
import "./Gallery.css";

export default function Gallery({ universityId }) {
  const [gallery, setGallery] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = "https://acvora-07fo.onrender.com"; // backend

  // Helper to handle both Cloudinary & local uploads
  const getUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${baseUrl}/${url}`;
  };

  // Fetch gallery data
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        if (!universityId) return;
        setLoading(true);
        setError(null);
        const res = await fetch(`${baseUrl}/api/universities/${universityId}/gallery`);
        const data = await res.json();
        if (data.success) {
          setGallery(data.gallery);
        } else {
          setError("Failed to load gallery data.");
        }
      } catch (err) {
        setError("Error fetching gallery: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [universityId]);

  // Handle file upload
  const handleFileUpload = async (e, category) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/universities/${universityId}/gallery/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setGallery((prev) => ({
          ...prev,
          [category]: [...(prev[category] || []), data.url],
        }));
      } else {
        setError("Failed to upload file.");
      }
    } catch (err) {
      setError("Error uploading file: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (url, category) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`${baseUrl}/api/universities/${universityId}/gallery`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, category }),
      });
      const data = await res.json();
      if (data.success) {
        setGallery((prev) => ({
          ...prev,
          [category]: prev[category].filter((item) => item !== url),
        }));
      } else {
        setError("Failed to delete item.");
      }
    } catch (err) {
      setError("Error deleting item: " + err.message);
    }
  };

  // Handle edit (placeholder for modal or form)
  const handleEdit = (url) => {
    alert(`Edit functionality for ${url} is not implemented yet.`);
  };

  const renderItems = (items, type, category) =>
    items.length > 0 ? (
      <div className="gallery-items">
        {items.map((url, i) => (
          <div key={i} className="gallery-item" role="group" aria-label={`${type} item ${i + 1}`}>
            {url.endsWith(".mp4") || url.endsWith(".webm") ? (
              <video src={getUrl(url)} controls className="gallery-video" aria-label={`${type} video`} />
            ) : (
              <img src={getUrl(url)} alt={`${type} ${i + 1}`} className="gallery-image" />
            )}
            <div className="gallery-actions">
              <button
                className="btn view"
                onClick={() => setPreview(getUrl(url))}
                title="View"
                aria-label={`View ${type} ${i + 1}`}
              >
                <FontAwesomeIcon icon={faEye} />
              </button>
              <button
                className="btn edit"
                onClick={() => handleEdit(url)}
                title="Edit"
                aria-label={`Edit ${type} ${i + 1}`}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="btn delete"
                onClick={() => handleDelete(url, category)}
                title="Delete"
                aria-label={`Delete ${type} ${i + 1}`}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <a
                href={getUrl(url)}
                download
                className="btn download"
                title="Download"
                aria-label={`Download ${type} ${i + 1}`}
              >
                <FontAwesomeIcon icon={faDownload} />
              </a>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="no-gallery">No {type} uploaded yet.</p>
    );

  return (
    <div className="gallery-page">
      <h2>University Gallery</h2>
      {error && <p className="error-message" role="alert">{error}</p>}
      {loading && <div className="loading-spinner" aria-label="Loading gallery">Loading...</div>}

      <div className="gallery-grid">
        <div className="gallery-category">
          <h3>Infrastructure Photos</h3>
          <label className="upload-btn" title="Upload Infrastructure Photo">
            <FontAwesomeIcon icon={faUpload} />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleFileUpload(e, "infraPhotos")}
              aria-label="Upload infrastructure photo"
            />
          </label>
          {gallery && renderItems(gallery.infraPhotos || [], "Infrastructure", "infraPhotos")}
        </div>

        <div className="gallery-category">
          <h3>Event Photos</h3>
          <label className="upload-btn" title="Upload Event Photo">
            <FontAwesomeIcon icon={faUpload} />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleFileUpload(e, "eventPhotos")}
              aria-label="Upload event photo"
            />
          </label>
          {gallery && renderItems(gallery.eventPhotos || [], "Event", "eventPhotos")}
        </div>

        <div className="gallery-category">
          <h3>Other Media</h3>
          <label className="upload-btn" title="Upload Other Media">
            <FontAwesomeIcon icon={faUpload} />
            <input
              type="file"
              accept="image/*,video/mp4,video/webm"
              hidden
              onChange={(e) => handleFileUpload(e, "otherPhotos")}
              aria-label="Upload other media"
            />
          </label>
          {gallery && renderItems(gallery.otherPhotos || [], "Other", "otherPhotos")}
        </div>
      </div>

      {preview && (
        <div className="modal-overlay" onClick={() => setPreview(null)} role="dialog" aria-modal="true">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setPreview(null)}
              title="Close"
              aria-label="Close preview"
            >
              ✕
            </button>
            {preview.endsWith(".mp4") || preview.endsWith(".webm") ? (
              <video src={preview} controls className="doc-preview" aria-label="Media preview" />
            ) : (
              <img src={preview} alt="Media preview" className="doc-preview" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}