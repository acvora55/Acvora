import React from "react";
import "./RecentReceipts.css";

export default function RecentReceipts() {
  const data = [
    { id: "#R001", student: "John Doe", institute: "ABC University", amount: "$1,200" },
    { id: "#R002", student: "Jane Smith", institute: "XYZ College", amount: "$900" },
  ];

  return (
    <div className="ad-table-card">
      <h3>Recent Receipts</h3>
      <table>
        <thead>
          <tr>
            <th>Receipt ID</th>
            <th>Student</th>
            <th>Institute</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.id}</td>
              <td>{row.student}</td>
              <td>{row.institute}</td>
              <td>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
