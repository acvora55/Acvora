import React from "react";
import "./RecentApplications.css";

export default function RecentApplications() {
  const data = [
    { student: "John Doe", institute: "ABC University", course: "MBA", stage: "Interview" },
    { student: "Jane Smith", institute: "XYZ College", course: "B.Tech", stage: "Submitted" },
  ];

  return (
    <div className="ad-table-card">
      <h3>Recent Applications</h3>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Institute</th>
            <th>Course</th>
            <th>Stage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.student}</td>
              <td>{row.institute}</td>
              <td>{row.course}</td>
              <td>{row.stage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
