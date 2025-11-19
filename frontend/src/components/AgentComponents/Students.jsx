import React, { useMemo, useState } from "react";
import axios from "axios";
import "./Students.css";
import AddStudentPopup from "./AddStudentPopup";

const Students = ({ students, setStudents, addStudent, updateStudent, deleteStudent }) => {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Delete student backend + state
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://acvora-1.onrender.com/api/students/${id}`);
      deleteStudent(id);
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) =>
      String(s.id).includes(q) ||
      s.name?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.status?.toLowerCase().includes(q)
    );
  }, [query, students]);

  return (
    <div className="page-wrap">
      <div className="students-container">
        <div className="students-header">
          <div className="students-header-left">
            <div className="logo-chip" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="currentColor" strokeWidth="1.4" />
                <path d="M12 8v9" stroke="currentColor" strokeWidth="1.4" />
                <path d="M7 10.5l5 2.5 5-2.5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </div>
            <div>
              <h1 className="students-title">Student Management</h1>
              <div className="students-subtitle">Manage roster, search, and update student records quickly</div>
            </div>
          </div>

          <div className="students-header-actions">
            <div className="students-input-wrap" role="search">
              <span className="students-input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7.25" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <input
                className="students-input"
                type="search"
                placeholder="Search by name, email, status…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search students"
              />
            </div>

            <button
              className="btn btn-add-student"
              onClick={() => {
                setEditingStudent(null);
                setIsModalOpen(true);
              }}
            >
              + Add Student
            </button>
          </div>
        </div>

        <div className="table-wrap" role="region" aria-label="Students table">
          <table className="students-table">
            <thead>
              <tr>
                <th style={{ width: "80px" }}>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th style={{ width: "170px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td>{s.id?.slice(-4)}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.status}</td>
                  <td>
                    <div className="actions">
                      <button className="action-button edit" onClick={() => { setEditingStudent(s); setIsModalOpen(true); }}>Edit</button>
                      <button className="action-button delete" onClick={() => handleDelete(s.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>No students found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddStudentPopup
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingStudent(null); }}
        onAddStudent={addStudent}
        onUpdateStudent={updateStudent}
        editingStudent={editingStudent}
      />
    </div>
  );
};

export default Students;
