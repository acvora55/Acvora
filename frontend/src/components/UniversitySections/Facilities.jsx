import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBook, FaLaptop, FaChalkboardTeacher, FaBus,
  FaUtensils, FaDumbbell, FaClinicMedical, FaHospital,
  FaFlask, FaBolt, FaUsers, FaBuilding, FaGraduationCap
} from "react-icons/fa";
import { MdLibraryBooks, MdComputer, MdMeetingRoom } from "react-icons/md";
import { GiCricketBat, GiSoccerBall } from "react-icons/gi";
import "./facilities.css";

const iconMap = {
  library: <FaBook style={{ color: "#007bff" }} />,
  "digital library": <MdLibraryBooks style={{ color: "#007bff" }} />,
  "computer lab": <MdComputer style={{ color: "#007bff" }} />,
  "mechanical lab": <FaFlask style={{ color: "#007bff" }} />,
  "civil lab": <FaBuilding style={{ color: "#007bff" }} />,
  "electrical lab": <FaBolt style={{ color: "#007bff" }} />,
  "digital classroom": <FaChalkboardTeacher style={{ color: "#007bff" }} />,
  auditorium: <MdMeetingRoom style={{ color: "#007bff" }} />,
  transport: <FaBus style={{ color: "#007bff" }} />,
  canteen: <FaUtensils style={{ color: "#007bff" }} />,
  gym: <FaDumbbell style={{ color: "#007bff" }} />,
  clinic: <FaClinicMedical style={{ color: "#007bff" }} />,
  hospital: <FaHospital style={{ color: "#007bff" }} />,
  "cricket ground": <GiCricketBat style={{ color: "#007bff" }} />,
  "football ground": <GiSoccerBall style={{ color: "#007bff" }} />,
  "boys hostel": <FaUsers style={{ color: "#007bff" }} />,
  "research & development": <FaGraduationCap style={{ color: "#007bff" }} />,
};

const Facilities = ({ universityId }) => {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    if (!universityId) return;

    axios
      .get(`https://acvora-1.onrender.com/api/universities/${universityId}`)
      .then((res) => {
        console.log("📥 API response:", res.data);
        setFacilities(res.data.facilities || []);
      })
      .catch((err) => console.error("❌ Error fetching facilities:", err));
  }, [universityId]);

  return (
    <div className="facilities-container">
      <h2 className="facilities-title">Campus Facilities</h2>
      <div className="facilities-grid">
        {facilities.length > 0 ? (
          facilities.map((fac, idx) => {
            const key = fac.name?.toLowerCase();
            const icon = iconMap[key] || <FaBuilding style={{ color: "#007bff" }} />;
            return (
              <div key={idx} className="facility-card">
                <div className="facility-header">
                  <span className="facility-icon">{icon}</span>
                  <h3 className="facility-title">{fac.name}</h3>
                </div>
                <p className="facility-description">{fac.description || "No description available"}</p>
              </div>
            );
          })
        ) : (
          <p>No facilities added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Facilities;
