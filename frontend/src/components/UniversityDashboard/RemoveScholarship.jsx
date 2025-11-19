import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./RemoveScholarship.css";

export default function RemoveScholarship() {
  const { id } = useParams();
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch(`https://acvora-07fo.onrender.com/api/universities/${id}/scholarships`);
        if (!res.ok) throw new Error("Failed to fetch scholarships");
        const data = await res.json();
        setScholarships(data);
      } catch (err) {
        console.error("Error fetching scholarships:", err);
        toast.error("Failed to load scholarships. Please try again.");
      }
    };
    fetchScholarships();
  }, [id]);

  const handleDelete = async (_id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the scholarship "${name}"? This action cannot be undone.`
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://acvora-07fo.onrender.com/api/universities/${id}/scholarships/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to delete scholarship");

      setScholarships(scholarships.filter((s) => s._id !== _id));
      toast.success("Scholarship deleted successfully!");
    } catch (err) {
      console.error("Error deleting scholarship:", err);
      toast.error(err.message || "Error deleting scholarship. Please try again.");
    }
  };

  return (
    <div className="ud-remsch-container">
      <div className="ud-remsch-main">
        <div className="ud-remsch-inner">
          <div className="ud-remsch-header">
            <h1 className="ud-remsch-title">Remove Scholarship</h1>
            <p className="ud-remsch-subtitle">
              Select scholarships to remove from the system.
            </p>
          </div>
          <div className="ud-remsch-card">
            <h2 className="ud-remsch-card-title">Scholarships List</h2>
            {scholarships.length === 0 ? (
              <div className="ud-remsch-empty">
                <p>No scholarships available to remove.</p>
              </div>
            ) : (
              <div className="ud-remsch-list">
                {scholarships.map((s) => (
                  <div key={s._id} className="ud-remsch-item">
                    <div>
                      <h3 className="ud-remsch-item-title">{s.name}</h3>
                      <p className="ud-remsch-item-desc">{s.description}</p>
                      <div className="ud-remsch-item-details">
                        <div>
                          <span>Provider:</span> {s.provider || "—"}
                        </div>
                        <div>
                          <span>Tags:</span> {s.tags?.join(", ") || "—"}
                        </div>
                        <div>
                          <span>Benefits:</span>{" "}
                          <span className="ud-remsch-benefits">
                            {s.benefits || "—"}
                          </span>
                        </div>
                        <div>
                          <span>Status:</span> {s.status || "—"}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(s._id, s.name)}
                      className="ud-remsch-delete-btn"
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