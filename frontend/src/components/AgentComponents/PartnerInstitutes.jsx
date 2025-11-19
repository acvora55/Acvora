import React, { useEffect, useMemo, useState } from "react";
import "./PartnerInstitutes.css";

export default function PartnerInstitutes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ name: "", location: "", courses: "", commission: "" });
  const [error, setError] = useState("");
  const [sort, setSort] = useState({ key: "name", dir: "asc" });
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [institutes, setInstitutes] = useState([]);

  const BASE_URL = "https://acvora-1.onrender.com";

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/institutes`);
        const data = await res.json();

        if (data.success) {
          const formatted = data.institutes.map((i) => ({
            id: i._id,
            name: i.name,
            location: i.location,
            courses: Array.isArray(i.courses) ? i.courses.join(", ") : i.courses,
            commission: `${i.commission}%`,
          }));
          setInstitutes(formatted);
        } else {
          console.error("Failed to fetch institutes:", data.message);
        }
      } catch (err) {
        console.error("Error fetching institutes:", err);
      }
    };

    fetchInstitutes();
  }, []);

  const toPercentNumber = (val) =>
    Math.max(0, Math.min(100, Number(String(val).replace(/[^\d.]/g, "")) || 0));

  const courseList = (courses) =>
    String(courses)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return institutes;
    return institutes.filter((i) =>
      [i.name, i.location, i.courses].some((f) => String(f).toLowerCase().includes(q))
    );
  }, [searchTerm, institutes]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    const { key, dir } = sort;

    list.sort((a, b) => {
      let av = a[key];
      let bv = b[key];

      if (key === "commission") {
        av = toPercentNumber(av);
        bv = toPercentNumber(bv);
      } else {
        av = String(av).toLowerCase();
        bv = String(bv).toLowerCase();
      }

      if (av < bv) return dir === "asc" ? -1 : 1;
      if (av > bv) return dir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [filtered, sort]);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * rowsPerPage;
  const pageRows = sorted.slice(start, start + rowsPerPage);

  const handleRowClick = (institute) => setSelectedInstitute(institute);
  const closeDetailsModal = () => setSelectedInstitute(null);

  const onSort = (key) => {
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSort({ key: "name", dir: "asc" });
    setPage(1);
  };

  const exportCSV = () => {
    const headers = ["Name", "Location", "Courses", "Commission"];
    const rows = sorted.map((i) => [i.name, i.location, i.courses, i.commission]);
    const csv = [headers, ...rows].map((r) =>
      r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    ).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "partner-institutes.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const openAddModal = () => {
    if (institutes.length >= 10) {
      alert("You can only add a maximum of 10 institutes.");
      return;
    }
    setForm({ name: "", location: "", courses: "", commission: "" });
    setError("");
    setShowAddModal(true);
  };

  const closeAddModal = () => setShowAddModal(false);

  const submitAdd = async (e) => {
    e.preventDefault();
    setError("");

    if (institutes.length >= 10) {
      setError("Maximum 10 institutes allowed.");
      return;
    }

    const name = form.name.trim();
    const location = form.location.trim();
    const courses = form.courses.trim();
    const commissionVal = toPercentNumber(form.commission);

    if (!name || !location || !courses || form.commission === "") {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/institutes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          location,
          courses: courses.split(",").map((c) => c.trim()),
          commission: commissionVal,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Failed to add institute.");
        return;
      }

      const newInstitute = {
        id: data.institute._id,
        name: data.institute.name,
        location: data.institute.location,
        courses: Array.isArray(data.institute.courses)
          ? data.institute.courses.join(", ")
          : data.institute.courses,
        commission: `${data.institute.commission}%`,
      };

      setInstitutes((prev) => [...prev, newInstitute]);
      setShowAddModal(false);
      setSearchTerm("");
      setPage(1);
    } catch (err) {
      console.error("Error adding institute:", err);
      setError("Something went wrong.");
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (selectedInstitute) setSelectedInstitute(null);
        if (showAddModal) setShowAddModal(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedInstitute, showAddModal]);

  const SortIcon = ({ active, dir }) => (
    <svg className="pi-sort-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      {active ? (
        dir === "asc" ? (
          <path d="M7 14l5-5 5 5H7z" fill="currentColor" />
        ) : (
          <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
        )
      ) : (
        <path d="M7 10l5 5 5-5H7z" fill="currentColor" opacity="0.45" />
      )}
    </svg>
  );

  const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.47 6.47 0 001.57-4.23 6.5 6.5 0 10-6.5 6.5 6.47 6.47 0 004.23-1.57l.27.28v.79l5 4.99L20.49 19 15.5 14zm-5 0A4.5 4.5 0 1115 9.5 4.5 4.5 0 0110.5 14z"/>
    </svg>
  );

  const headerSubtitle = (
    <p className="pi-header-subtitle">Manage, track and grow your partner network.</p>
  );

  const header = (
    <div className="pi-partner-institutes-header">
      <div>
        <h2>Partner Institutes</h2>
        {headerSubtitle}
      </div>
      <div className="pi-partner-institutes-actions">
        <div className="pi-input-with-icon">
          <input
            type="text"
            placeholder="Search by name, location, or course…"
            className="pi-search-input"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            aria-label="Search institutes"
          />
          <SearchIcon />
        </div>
        <button className="pi-action-button pi-secondary" onClick={resetFilters} title="Clear filters">
          Clear
        </button>
        <button className="pi-action-button pi-secondary" onClick={exportCSV} title="Export CSV">
          Export
        </button>
        <button className="pi-action-button pi-primary" onClick={openAddModal}>
          + Add Institute
        </button>
      </div>
    </div>
  );

  const ariaSort = (key) => (sort.key === key ? (sort.dir === "asc" ? "ascending" : "descending") : "none");

  return (
    <div className="pi-partner-institutes-content">
      {header}

      <div className="pi-partner-institutes-table">
        <div className="pi-ad-table-card">
          <h3>Institute List</h3>

          <div className="pi-table-scroll" role="region" aria-label="Partner institutes table">
            <table role="grid">
              <thead>
                <tr>
                  <th scope="col" aria-sort={ariaSort("name")}>
                    <button className="pi-th-sort" onClick={() => onSort("name")} aria-label={`Sort by name, current ${ariaSort("name")}`}>
                      Name <SortIcon active={sort.key === "name"} dir={sort.dir} />
                    </button>
                  </th>
                  <th scope="col" aria-sort={ariaSort("location")}>
                    <button className="pi-th-sort" onClick={() => onSort("location")} aria-label={`Sort by location, current ${ariaSort("location")}`}>
                      Location <SortIcon active={sort.key === "location"} dir={sort.dir} />
                    </button>
                  </th>
                  <th scope="col">
                    Courses Offered
                  </th>
                  <th scope="col" aria-sort={ariaSort("commission")}>
                    <button className="pi-th-sort" onClick={() => onSort("commission")} aria-label={`Sort by commission, current ${ariaSort("commission")}`}>
                      Commission <SortIcon active={sort.key === "commission"} dir={sort.dir} />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageRows.length > 0 ? (
                  pageRows.map((institute) => {
                    const percent = toPercentNumber(institute.commission);
                    const initials = institute.name
                      .split(" ")
                      .map((s) => s[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <tr
                        key={institute.id}
                        className="pi-institute-row"
                        onClick={() => handleRowClick(institute)}
                        tabIndex={0}
                        role="button"
                        aria-label={`View details for ${institute.name}`}
                        onKeyDown={(e) => e.key === "Enter" && handleRowClick(institute)}
                      >
                        <td>
                          <div className="pi-cell-name">
                            <div className="pi-avatar" aria-hidden="true">{initials}</div>
                            <div>{institute.name}</div>
                          </div>
                        </td>
                        <td>{institute.location}</td>
                        <td>
                          <div className="pi-chips" aria-label={`Courses offered by ${institute.name}`}>
                            {courseList(institute.courses).map((c, idx) => (
                              <span key={idx} className="pi-chip">{c}</span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <span className="pi-commission" aria-label={`Commission ${percent}%`}>
                            {percent}%
                            <span className="pi-commission-bar" aria-hidden="true">
                              <span className="pi-commission-fill" style={{ width: `${percent}%` }} />
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="pi-no-data" aria-live="polite">
                      No institutes found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pi-table-footer">
            <div>
              Showing <strong>{pageRows.length}</strong> of <strong>{total}</strong>
            </div>
            <div className="pi-pagination">
              <button className="pi-page-btn" onClick={() => setPage(1)} disabled={currentPage === 1} aria-label="First page">«</button>
              <button className="pi-page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} aria-label="Previous page">‹</button>
              <span>Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></span>
              <button className="pi-page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} aria-label="Next page">›</button>
              <button className="pi-page-btn" onClick={() => setPage(totalPages)} disabled={currentPage === totalPages} aria-label="Last page">»</button>
            </div>
            <div>
              <label htmlFor="rows" style={{ marginRight: 8, color: "var(--color-muted)" }}>Rows</label>
              <select
                id="rows"
                className="pi-rows-select"
                value={rowsPerPage}
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {selectedInstitute && (
        <div
          className="pi-modal-overlay"
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
          onClick={closeDetailsModal}
        >
          <div className="pi-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 id="modal-title">{selectedInstitute.name}</h3>
            <p><strong>Location:</strong> {selectedInstitute.location}</p>
            <p><strong>Courses Offered:</strong> {selectedInstitute.courses}</p>
            <p><strong>Commission Rate:</strong> {selectedInstitute.commission}</p>
            <div className="pi-form-actions">
              <button className="pi-action-button pi-secondary" onClick={closeDetailsModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div
          className="pi-modal-overlay"
          role="dialog"
          aria-labelledby="add-modal-title"
          aria-modal="true"
          onClick={closeAddModal}
        >
          <div className="pi-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 id="add-modal-title">Add New Institute</h3>

            <form className="pi-form-grid" onSubmit={submitAdd}>
              <div className="pi-form-field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Enter institute name"
                />
              </div>
              <div className="pi-form-field">
                <label htmlFor="loc">Location</label>
                <input
                  id="loc"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  required
                  placeholder="Enter location"
                />
              </div>
              <div className="pi-form-field">
                <label htmlFor="courses">Courses (comma separated)</label>
                <input
                  id="courses"
                  value={form.courses}
                  onChange={(e) => setForm({ ...form, courses: e.target.value })}
                  required
                  placeholder="e.g., MBA, B.Tech"
                />
              </div>
              <div className="pi-form-field">
                <label htmlFor="commission">Commission (%)</label>
                <input
                  id="commission"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={form.commission}
                  onChange={(e) => setForm({ ...form, commission: e.target.value })}
                  required
                  placeholder="Enter percentage"
                />
              </div>

              {error && <div style={{ color: "#ff6b6b", fontWeight: 600 }}>{error}</div>}

              <div className="pi-form-actions">
                <button type="button" className="pi-action-button pi-secondary" onClick={closeAddModal}>Cancel</button>
                <button type="submit" className="pi-action-button pi-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}