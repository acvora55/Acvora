import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./RemoveScholarship.css"; // Import CSS

export default function RemoveScholarship() {
  const [scholarships, setScholarships] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch("https://acvora-1.onrender.com/api/scholarships");
        if (!res.ok) throw new Error("Failed to fetch scholarships");
        const data = await res.json();
        setScholarships(data);
      } catch (err) {
        console.error("Error fetching scholarships:", err);
        toast.error("Failed to load scholarships. Please try again.");
      }
    };
    fetchScholarships();
  }, []);

  const handleDelete = async (_id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the scholarship "${name}"? This action cannot be undone.`
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://acvora-1.onrender.com/api/scholarships/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete scholarship");

      setScholarships(scholarships.filter((s) => s._id !== _id));
      toast.success("Scholarship deleted successfully!");
    } catch (err) {
      console.error("Error deleting scholarship:", err);
      toast.error(err.message || "Error deleting scholarship. Please try again.");
    }
  };

  return (
<div className="ad-remsch-container">
  <div className="ad-remsch-main">
    <div className="ad-remsch-inner">
      <div className="ad-remsch-header">
        <h1 className="ad-remsch-title">Remove Scholarship</h1>
        <p className="ad-remsch-subtitle">
          Select scholarships to remove from the system.
        </p>
      </div>

      <div className="ad-remsch-card">
        <h2 className="ad-remsch-card-title">Scholarships List</h2>

        {scholarships.length === 0 ? (
          <div className="ad-remsch-empty">
            <p>No scholarships available to remove.</p>
          </div>
        ) : (
          <div className="ad-remsch-list">
            {scholarships.map((s) => (
              <div key={s._id} className="ad-remsch-item">
                <div>
                  <h3 className="ad-remsch-item-title">{s.name}</h3>
                  <p className="ad-remsch-item-desc">{s.description}</p>
                  <div className="ad-remsch-item-details">
                    <div>
                      <span>Provider:</span> {s.provider || "—"}
                    </div>
                    <div>
                      <span>Tags:</span> {s.tags?.join(", ") || "—"}
                    </div>
                    <div>
                      <span>Benefits:</span>{" "}
                      <span className="ad-remsch-benefits">{s.benefits || "—"}</span>
                    </div>
                    <div>
                      <span>Status:</span> {s.status || "—"}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(s._id, s.name)}
                  className="ad-remsch-delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
</div>
  );
}
