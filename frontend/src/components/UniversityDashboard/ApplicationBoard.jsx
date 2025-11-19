import React, { useState } from "react";
import "./ApplicationBoard.css"; 

export default function ApplicationBoard() {
  const statuses = ["New", "Review", "Shortlisted", "Accepted", "Rejected"];
  
  const [applications, setApplications] = useState([
    { id: 1, name: "Aisha Khan", course: "B.Sc CS", status: "New", date: "2023-10-01", email: "aisha@example.com" },
    { id: 2, name: "Ravi Patel", course: "BBA", status: "Review", date: "2023-10-02", email: "ravi@example.com" },
    { id: 3, name: "Sneha Roy", course: "BCA", status: "Shortlisted", date: "2023-10-03", email: "sneha@example.com" },
    { id: 4, name: "John Doe", course: "M.Sc Physics", status: "Accepted", date: "2023-10-04", email: "john@example.com" },
    { id: 5, name: "Jane Smith", course: "B.Tech EE", status: "Rejected", date: "2023-10-05", email: "jane@example.com" },
    { id: 6, name: "Alex Johnson", course: "MBA", status: "New", date: "2023-10-06", email: "alex@example.com" },
    { id: 7, name: "Emily Davis", course: "B.Com", status: "Review", date: "2023-10-07", email: "emily@example.com" },
  ]);

  const [activeFilter, setActiveFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const statusCounts = statuses.reduce((acc, status) => {
    acc[status] = applications.filter(app => app.status === status).length;
    return acc;
  }, {});

  const filteredApps = applications.filter(app => {
    const matchesFilter = !activeFilter || app.status === activeFilter;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.course.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleFilterClick = (status) => {
    setActiveFilter(activeFilter === status ? null : status);
  };

  const handleStatusChange = (id, newStatus) => {
    setApplications(prevApps => prevApps.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <section className="ud-card ud-app-board">
      <h3>Application Status Board</h3>
      
      <input 
        type="text" 
        className="ud-search-input"
        placeholder="Search by name, course, or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <div className="ab-app-filters">
        <button 
          className={`ab-filter-chip ${!activeFilter ? 'ab-filter-chip-active' : ''}`} 
          onClick={() => setActiveFilter(null)}
        >
          All ({applications.length})
        </button>
        {statuses.map((s) => (
          <button 
            key={s} 
            className={`ab-filter-chip ${activeFilter === s ? 'ab-filter-chip-active' : ''}`} 
            onClick={() => handleFilterClick(s)}
          >
            {s} ({statusCounts[s] || 0})
          </button>
        ))}
      </div>

      <div className="ud-app-list">
        {filteredApps.length === 0 ? (
          <p className="ud-no-results">No applications match your search or filter.</p>
        ) : (
          filteredApps.map((a) => (
            <div key={a.id} className="ud-app-row">
              <div className="ud-app-info">
                <strong>{a.name}</strong>
                <div className="ud-app-sub">{a.course} | Applied: {a.date} | {a.email}</div>
              </div>
              <div className="ud-app-status">
                <div className={`ud-badge ud-badge-${a.status.toLowerCase()}`}>{a.status}</div>
                <select 
                  className="ud-status-select"
                  value={a.status}
                  onChange={(e) => handleStatusChange(a.id, e.target.value)}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
