import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEdit,
  faTrash,
  faPlus,
  faSave,
  faTimes,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import "./Courses.css";

export default function Courses({ universityId }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    totalFees: "",
    yearlyFees: "",
    duration: "",
    intake: "",
    applyLink: "",
  });

  const baseUrl = "https://acvora-1.onrender.com";

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (!universityId) return;
        const res = await fetch(`${baseUrl}/api/universities/${universityId}/courses`);
        const data = await res.json();
        if (data.courses && Array.isArray(data.courses)) {
          setCourses(data.courses);
        }
      } catch (err) {
        console.error("❌ Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [universityId]);

  const startEditing = (course) => {
    setEditingId(course._id);
    setEditData(course);
  };

  const saveCourse = async (id) => {
    try {
      await fetch(`${baseUrl}/api/universities/${universityId}/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      setCourses(courses.map((c) => (c._id === id ? editData : c)));
      setEditingId(null);
    } catch (err) {
      console.error("❌ Error saving course:", err);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await fetch(`${baseUrl}/api/universities/${universityId}/courses/${id}`, {
        method: "DELETE",
      });
      setCourses(courses.filter((c) => c._id !== id));
    } catch (err) {
      console.error("❌ Error deleting course:", err);
    }
  };

  const addCourse = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/universities/${universityId}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });
      const data = await res.json();
      setCourses([data.course, ...courses]);
      setNewCourse({
        courseName: "",
        totalFees: "",
        yearlyFees: "",
        duration: "",
        intake: "",
        applyLink: "",
      });
    } catch (err) {
      console.error("❌ Error adding course:", err);
    }
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      try {
        await fetch(`${baseUrl}/api/universities/${universityId}/courses/bulk`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courses: json }),
        });
        setCourses(json);
      } catch (err) {
        console.error("❌ Bulk upload failed:", err);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  if (loading) return <p className="ud-courses-loading">Loading courses...</p>;

  return (
    <div className="ud-courses-page">
      <h2 className="ud-courses-title">Courses & Fees</h2>

      <div className="ud-upload-section">
        <label className="ud-upload-btn">
          <FontAwesomeIcon icon={faUpload} /> Upload Excel
          <input type="file" accept=".xlsx,.xls" hidden onChange={handleExcelUpload} />
        </label>
      </div>

      <div className="ud-courses-card">
        <div className="ud-table-container">
          <table className="ud-data-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Total Fees</th>
                <th>Yearly Fees</th>
                <th>Duration</th>
                <th>Intake</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course._id}>
                    {editingId === course._id ? (
                      <>
                        <td><input value={editData.courseName} onChange={(e) => setEditData({ ...editData, courseName: e.target.value })} /></td>
                        <td><input value={editData.totalFees} onChange={(e) => setEditData({ ...editData, totalFees: e.target.value })} /></td>
                        <td><input value={editData.yearlyFees} onChange={(e) => setEditData({ ...editData, yearlyFees: e.target.value })} /></td>
                        <td><input value={editData.duration} onChange={(e) => setEditData({ ...editData, duration: e.target.value })} /></td>
                        <td><input value={editData.intake} onChange={(e) => setEditData({ ...editData, intake: e.target.value })} /></td>
                        <td>
                          <div className="ud-action-buttons">
                            <button onClick={() => saveCourse(course._id)}><FontAwesomeIcon icon={faSave} /></button>
                            <button onClick={() => setEditingId(null)}><FontAwesomeIcon icon={faTimes} /></button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{course.courseName}</td>
                        <td>{course.totalFees}</td>
                        <td>{course.yearlyFees}</td>
                        <td>{course.duration}</td>
                        <td>{course.intake}</td>
                        <td>
                          <div className="ud-action-buttons">
                            <button onClick={() => startEditing(course)}><FontAwesomeIcon icon={faEdit} /></button>
                            <button onClick={() => deleteCourse(course._id)}><FontAwesomeIcon icon={faTrash} /></button>
                            <a href={course.applyLink || "#"} className="ud-courses-apply-btn" target="_blank" rel="noreferrer">
                              <FontAwesomeIcon icon={faArrowRight} />
                            </a>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6">No courses available.</td></tr>
              )}

              {/* Add new row */}
              <tr>
                <td><input value={newCourse.courseName} onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })} /></td>
                <td><input value={newCourse.totalFees} onChange={(e) => setNewCourse({ ...newCourse, totalFees: e.target.value })} /></td>
                <td><input value={newCourse.yearlyFees} onChange={(e) => setNewCourse({ ...newCourse, yearlyFees: e.target.value })} /></td>
                <td><input value={newCourse.duration} onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })} /></td>
                <td><input value={newCourse.intake} onChange={(e) => setNewCourse({ ...newCourse, intake: e.target.value })} /></td>
                <td><button onClick={addCourse}><FontAwesomeIcon icon={faPlus} /></button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
