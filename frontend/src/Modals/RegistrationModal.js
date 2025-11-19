import React, { useState, useEffect } from "react";
import logo1 from "../Images/reglogo.mp4";
import { CgProfile } from "react-icons/cg";
import { BsTelephone } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import regpic from "../Images/regpic.webp";
import svg1 from "../Images/scholarship.svg";
import svg2 from "../Images/education.svg";
import svg3 from "../Images/shortlist.svg";
import svg4 from "../Images/admission.svg";
import svg5 from "../Images/codind.svg";
import svg6 from "../Images/book.svg";
import Axios from "axios";
import "./RegistrationModal.css";

const RegistrationModal = ({ closeModal }) => {
  const [records, setRecords] = useState([]);
  const [user, setUser] = useState({
    name: "",
    mobileNumber: "",
    location: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden"; // disable scroll when modal is open
    return () => {
      document.body.style.overflow = "auto"; // enable scroll again when modal closes
    };
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // basic client-side validation
    if (!user.name?.trim() || !user.mobileNumber?.trim() || !user.location?.trim()) {
      setError("Please fill name, mobile number and location.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: user.name,
        mobileNumber: user.mobileNumber,
        location: user.location,
      };

      const resp = await Axios.post("https://acvora-07fo.onrender.com/register", payload);

      // success handling
      const newRecord = { ...user, id: new Date().getTime().toString() };
      setRecords((prev) => [...prev, newRecord]);
      setUser({ name: "", mobileNumber: "", location: "" });
      setMessage(resp.data?.message || "Registered successfully");

      // optionally close the modal after success
      closeModal(false);
    } catch (err) {
      console.error(err);
      // get a useful error message from server if available
      const serverMsg =
        err?.response?.data?.message || err?.response?.data?.error || err?.message;
      setError(serverMsg || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="rm-modal-overlay">
        <div className="rm-modal-container">
          <div className="rm-modal-content">
            {/* Close Button */}
            <div className="rm-close-button-container">
              <button className="rm-close-button" onClick={() => closeModal(false)}>
                X
              </button>
            </div>

            <div className="rm-modal-body">
              {/* left section */}
              <div className="rm-left-section">
                <div className="rm-left-header">
                  <h2 className="rm-left-title">
                    How{" "}
                    <span className="rm-brand-name">FindMyCollege</span>{" "}
                    Help You In Admission
                  </h2>
                </div>
                <div className="rm-features-grid">
                  <div className="rm-feature-card">
                    <img className="rm-feature-icon" src={svg1} alt="/" />
                    <p className="rm-feature-label">education</p>
                  </div>
                  <div className="rm-feature-card">
                    <img className="rm-feature-icon" src={svg4} alt="/" />
                    <p className="rm-feature-label">Deadline</p>
                  </div>
                  <div className="rm-feature-card">
                    <img className="rm-feature-icon" src={svg2} alt="/" />
                    <p className="rm-feature-label">scholarship</p>
                  </div>
                  <div className="rm-feature-card">
                    <img className="rm-feature-icon" src={svg3} alt="/" />
                    <p className="rm-feature-label">24/7Cunselling</p>
                  </div>
                  <div className="rm-feature-card">
                    <img className="rm-feature-icon" src={svg4} alt="/" />
                    <p className="rm-feature-label">Deadline</p>
                  </div>
                  <div className="rm-feature-card">
                    <img className="rm-feature-icon" src={svg5} alt="/" />
                    <p className="rm-feature-label">Admission</p>
                  </div>
                  <div className="rm-feature-card">
                    <img className="rm-feature-icon" src={svg3} alt="/" />
                    <p className="rm-feature-label">24/7Cunselling</p>
                  </div>
                  <div className="rm-feature-card">
                    <img className="rm-feature-icon" src={svg6} alt="/" />
                    <p className="rm-feature-label">Shortlist</p>
                  </div>
                </div>
              </div>

              {/* right section */}
              <div className="rm-right-section">
                <div className="rm-header-section">
                  <video className="rm-logo-video" width="80" height="240" autoPlay loop>
                    <source src={logo1} type="video/mp4" />
                  </video>
                  <div className="rm-header-text">
                    <h2 className="rm-register-title">
                      <span className="rm-register-highlight">Register</span> Now
                    </h2>
                    <p className="rm-subtitle">Get Details & Latest update</p>
                  </div>
                </div>

                <hr className="rm-divider" />

                <div className="rm-form-section">
                  <div className="rm-image-container">
                    <img className="rm-reg-image" src={regpic} alt="/" />
                  </div>

                  <form onSubmit={handleSubmit} className="rm-registration-form">
                    <section className="rm-input-section">
                      <div className="rm-input-icon-container">
                        <CgProfile className="rm-input-icon" size="28" />
                      </div>
                      <div className="rm-input-wrapper">
                        <input
                          name="name"
                          id="name"
                          value={user.name}
                          onChange={handleInput}
                          className="rm-form-input"
                          type="text"
                          placeholder="Full Name"
                          required
                        />
                      </div>
                    </section>

                    <section className="rm-input-section">
                      <div className="rm-input-icon-container rm-tel-icon">
                        <BsTelephone className="rm-input-icon" size="24" />
                      </div>
                      <div className="rm-input-wrapper">
                        <input
                          name="mobileNumber"
                          id="mobileNumber"
                          value={user.mobileNumber}
                          onChange={handleInput}
                          className="rm-form-input"
                          type="tel"
                          placeholder="Mobile No."
                          required
                        />
                      </div>
                    </section>

                    <section className="rm-input-section">
                      <div className="rm-input-icon-container rm-location-icon">
                        <GrLocation className="rm-input-icon" size="24" />
                      </div>
                      <div className="rm-input-wrapper">
                        <input
                          name="location"
                          id="location"
                          value={user.location}
                          onChange={handleInput}
                          className="rm-form-input"
                          type="text"
                          placeholder="Location"
                          required
                        />
                      </div>
                    </section>

                    {/* Show success / error */}
                    {message && <p className="rm-success-message">{message}</p>}
                    {error && <p className="rm-error-message">{error}</p>}

                    <div className="rm-button-container">
                      <button className="rm-submit-button" type="submit" disabled={submitting}>
                        {submitting ? "Registering..." : "Register"}
                      </button>
                    </div>
                  </form>

                  <div className="rm-login-link">
                    <p className="rm-login-text">
                      Already Registered? Click Here to{" "}
                      <a className="rm-login-link-text" href="/">
                        LOGIN
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegistrationModal;