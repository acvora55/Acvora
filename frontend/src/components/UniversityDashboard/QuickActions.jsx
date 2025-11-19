import React from "react";
import "./QuickActions.css";
export default function QuickActions() {
  const actions = [
    { id: "add-course", label: "Add Course" },
    { id: "post-update", label: "Post Update" },
    { id: "download-leads", label: "Download Leads" },
  ];
  return (
    <section className="ud-card ud-quick-actions">
      {actions.map((a) => (
        <button key={a.id} className="ud-btn ud-btn-outline" onClick={() => alert(`${a.label} (placeholder)`)} >
          {a.label}
        </button>
      ))}
    </section>
  );
}
