import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MainView.css";
import DashboardAgent from "./DashboardAgent";
import PartnerInstitutes from "./PartnerInstitutes";
import Students from "./Students";
import Applications from "./Applications";
import Payments from "./Payments";
import Wallet from "./wallet";
import Reports from "./reports";
import Announcements from "./Announcements";
import Support from "./support";
import Settings from "./settings";

export default function MainView({ route, sidebarOpen }) {
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);


  // fetch students from backend ONCE
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("https://acvora-07fo.onrender.com/api/students");
        setStudents(res.data.map((s) => ({ ...s, id: s._id })));
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudents();
  }, []);

  const addStudent = (newStudent) => {
    setStudents((prev) => [...prev, { ...newStudent, id: newStudent._id }]);
  };

  const updateStudent = (id, updatedStudent) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedStudent } : s))
    );
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };


  let content;
  switch (route) {
    case "dashboard":
      content = <DashboardAgent />;
      break;
    case "PartnerInstitutes":
      content = <PartnerInstitutes />;
      break;
    case "students":
      content = (
        <Students
          students={students}
          setStudents={setStudents}
          addStudent={addStudent}
          updateStudent={updateStudent}
          deleteStudent={deleteStudent}
        />
      );
      break;
    case "Applications":
      content = (
        <Applications
          students={students}
          setStudents={setStudents}
        />
      );
      break;
case "Payments":
  content = <Payments students={students} />;
  break;

    case "commission-wallet":
      content = <Wallet />;
      break;
    case "reports":
      content = <Reports />;
      break;
    case "Announcements":
      content = <Announcements />;
      break;
    case "Support":
      content = <Support />;
      break;
    case "Settings":
      content = <Settings />;
      break;
    default:
      content = (
        <>
          <h2>Welcome to DashboardAgent</h2>
          <p>Please select a valid route.</p>
        </>
      );
  }

  return (
    <div className={`main-view ${!sidebarOpen ? "full-width" : ""}`}>
      {content}
    </div>
  );
}
