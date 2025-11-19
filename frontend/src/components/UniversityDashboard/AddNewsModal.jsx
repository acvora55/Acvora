import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import "./AddNewsModal.css";

export default function AddNewsModal({ onClose, onNewsAdded, editingNews }) {
  const { id: universityId } = useParams();  // 👈 get current uni id
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Prefill fields if editing
  useEffect(() => {
    if (editingNews) {
      setTitle(editingNews.title);
      setDescription(editingNews.description);
      setCategory(editingNews.category || "General");
      setDate(editingNews.date?.split("T")[0] || "");
    }
  }, [editingNews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("date", date);
      formData.append("universityId", universityId);  // ✅ attach uniId
      if (image) formData.append("image", image);

      const url = editingNews
        ? `https://acvora-07fo.onrender.com/api/news/${editingNews._id}`
        : "https://acvora-07fo.onrender.com/api/news";

      const method = editingNews ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        onNewsAdded(data.news);
        onClose();
      } else {
        alert(data.message || "Failed to save news");
      }
    } catch (err) {
      console.error("Error saving news:", err);
      alert("Error saving news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{editingNews ? "Edit News" : "Add News"}</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Academic Announcements">Academic Announcements</option>
            <option value="Events & Activities">Events & Activities</option>
            <option value="Achievements">Achievements</option>
            <option value="Campus Life Updates">Campus Life Updates</option>
            <option value="Partnerships & Collaborations">Partnerships & Collaborations</option>
            <option value="General">General</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : editingNews ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
