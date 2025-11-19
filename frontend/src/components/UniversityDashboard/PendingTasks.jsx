import React from "react";
import "./PendingTasks.css";

export default function PendingTasks() {
  const tasks = ["Verify Docs", "Add Brochure", "Reply Messages", "Update Fees"];
  return (
    <section className="ud-card ud-pending">
      <h3>Pending Tasks</h3>
      <div className="ud-task-list">
        {tasks.map((t) => (
          <button key={t} className="ud-chip" onClick={() => alert(`${t} clicked (placeholder)` )}>
            {t}
          </button>
        ))}
      </div>
    </section>
  );
}
