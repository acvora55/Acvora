import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle logic here
    alert("Form submitted!");
    navigate("/profile");
  };

  return (
    <section className="admin-login__container">
      <Navbar />
      <div className="admin-login__register">
        <div className="admin-login__col-1">
          <h2 className="admin-login__heading">Register Your College</h2>
          <span className="admin-login__subtitle">
            To increase your reach to students
          </span>

          <form
            id="admin-login-form"
            className="admin-login__form flex flex-col"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <button type="submit" className="admin-login__btn">
              Sign In
            </button>
          </form>
        </div>
        <div className="admin-login__col-2">
          {/* <img src={bgImg} alt="College Registration" /> */}
        </div>
      </div>
    </section>
  );
}
