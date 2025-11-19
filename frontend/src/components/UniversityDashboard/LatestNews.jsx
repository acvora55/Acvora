import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // 👈 get university id
import AddNewsModal from "./AddNewsModal";
import "./LatestNews.css";

export default function LatestNews() {
  const { id: universityId } = useParams(); // 👈 extract :id from URL
  const [news, setNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  // Fetch news on load (scoped by university)
  useEffect(() => {
    if (!universityId) return;

    fetch(`https://acvora-1.onrender.com/api/universities/${universityId}/news`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setNews(data.news);
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, [universityId]);

  // Add or update news
  const handleNewsSaved = (savedItem) => {
    if (editingNews) {
      setNews((prev) =>
        prev.map((n) => (n._id === savedItem._id ? savedItem : n))
      );
    } else {
      setNews((prev) => [savedItem, ...prev]);
    }
    setEditingNews(null);
  };

  // Delete news
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;
    try {
      const res = await fetch(
        `https://acvora-1.onrender.com/api/universities/${universityId}/news/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success) {
        setNews((prev) => prev.filter((n) => n._id !== id));
      } else {
        alert(data.message || "Failed to delete news");
      }
    } catch (err) {
      console.error("Error deleting news:", err);
    }
  };

  return (
    <section className="ud-news">
      <div className="ud-news-header">
        <h3>Latest News / Posts</h3>
        <button
          className="ud-btn ud-btn-add"
          onClick={() => setShowModal(true)}
        >
          + Add News
        </button>
      </div>

      {news.length === 0 ? (
        <p>No news available</p>
      ) : (
        <div className="ud-news-grid">
          {news.map((n) => (
            <div key={n._id} className="ud-news-card">
              <div className="ud-news-image-wrap">
                <img src={n.image} alt={n.title} className="ud-news-image" />
              </div>
              <div className="ud-news-content">
                <span className="ud-news-title">{n.title}</span>
                <p className="ud-news-description">{n.description}</p>
              </div>
              <div className="ud-news-footer">
                <span className="ud-news-date">
                  {new Date(n.date).toLocaleDateString()}
                </span>
                <div className="ud-news-actions">
                  <button
                    className="ud-btn ud-btn-edit"
                    onClick={() => {
                      setEditingNews(n);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="ud-btn ud-btn-delete"
                    onClick={() => handleDelete(n._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <AddNewsModal
          onClose={() => {
            setShowModal(false);
            setEditingNews(null);
          }}
          onNewsAdded={handleNewsSaved}
          editingNews={editingNews}
          universityId={universityId} // 👈 pass uniId so it saves correctly
        />
      )}
    </section>
  );
}
