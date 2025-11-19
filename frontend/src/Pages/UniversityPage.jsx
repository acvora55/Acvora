import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
  faMoon,
  faSun,
  faCompass,
  faRightToBracket,
  faUserPlus,
  faArrowRightFromBracket,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import AboutUs from "../components/UniversitySections/AboutUs";
import Info from "../components/UniversitySections/Info";
import Cutoff from "../components/UniversitySections/Cutoff";
import Placement from "../components/UniversitySections/Placements";
import Facilities from "../components/UniversitySections/Facilities";
import Admission from "../components/UniversitySections/Admission";
import QA from "../components/UniversitySections/QA";
import Gallery from "../components/UniversitySections/Gallery";
import NewsArticles from "../components/UniversitySections/NewsArticles";
import Reviews from "../components/UniversitySections/Reviews";
import Footer from "../components/Footer";

import logo from "../../src/Images/logoo.png";
import "./UniversityPage.css";
import "../components/UniversitySections/CoursesAndFees.css";

const API_BASE = import.meta?.env?.VITE_API_BASE || "https://acvora-07fo.onrender.com";
const FALLBACK_BANNER =
  "https://www.shutterstock.com/image-photo/ucla-los-angeles-usa-may-600nw-2397826809.jpg";
const FALLBACK_LOGO = "https://placehold.co/96x96?text=Logo";

function UniversityPage() {
  const { id } = useParams();
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState("About");
  const [university, setUniversity] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const dropdownRef = useRef(null);
  const scrollRef = useRef(null);
  const [bannerIndex, setBannerIndex] = useState(0);

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Fetch university data
  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        setStatus("loading");
        const res = await fetch(`${API_BASE}/api/universities/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to fetch university data");
        setUniversity(data?.uni || data);
        setStatus("ready");
      } catch (e) {
        setError(e.message);
        setStatus("error");
      }
    };
    fetchUniversity();
  }, [id]);

  // Banner sources (deduplicate and filter)
  const bannerSources = [
    ...(university?.bannerImage || []),
    ...(university?.photos || []),
    ...(university?.galleryImages || []),
  ].filter((url, index, self) => url && self.indexOf(url) === index);

  // Banner auto-slide
  useEffect(() => {
    if (bannerSources.length <= 1) return;

    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerSources.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerSources.length]);

  // Scroll handlers
  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -100, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 100, behavior: "smooth" });

  // Safe logo and banner handling
  const uniLogo = university?.logo?.[0] || FALLBACK_LOGO;
  const bannerImage = bannerSources[bannerIndex] || FALLBACK_BANNER;

  // Chips for university metadata
  const chips = [
    university?.type,
    university?.ownership,
    university?.accreditation,
    university?.affiliation,
  ].filter(Boolean);

  return (
    <div className="uni-page min-h-screen">
      {/* Navbar */}
      <nav className="uni-navbar">
        <div className="uni-navbar-left flex items-center">
          <img
            src={logo}
            alt="Uni Hub Logo"
            className="uni-logo h-8 w-8 mr-2 object-cover rounded-full bg-white"
          />
          <span className={`uni-title font-bold ${darkMode ? "text-white" : "text-black"}`}>
            Uni Hub
          </span>
        </div>

        <div className="uni-navbar-center flex-1 mx-10">
          <input
            type="text"
            placeholder="Search universities..."
            className="uni-search w-full"
            aria-label="Search universities"
          />
        </div>

        <div className="uni-navbar-right flex items-center space-x-2 relative">
          <button className="uni-btn-accent" aria-label="Write a review">
            Write a Review
          </button>
          <button className="uni-btn-primary flex items-center" aria-label="Explore universities">
            <FontAwesomeIcon icon={faCompass} className="mr-1 text-white" />
            Explore
          </button>
          <button className="uni-btn-icon" aria-label="Notifications">
            <FontAwesomeIcon icon={faBell} />
          </button>
          <button
            className="uni-btn-icon"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>

          {/* User dropdown */}
          <div className="uni-dropdown" ref={dropdownRef}>
            <button
              className="uni-btn-icon"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              aria-label="User menu"
              aria-expanded={showUserDropdown}
            >
              <FontAwesomeIcon icon={faUser} />
            </button>

            {showUserDropdown && (
              <div className="uni-dropdown-menu">
                {user ? (
                  <>
                    <p className="px-4 py-2">
                      Signed in as <br />
                      <strong>{user.name}</strong>
                    </p>
                    <button
                      onClick={() => setUser(null)}
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-1" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <FontAwesomeIcon icon={faRightToBracket} className="mr-1" />
                      Login
                    </button>
                    <button className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <FontAwesomeIcon icon={faUserPlus} className="mr-1" />
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Course dropdown */}
          <select className="uni-select" aria-label="Select course">
            <option>All Courses</option>
            {university?.courses?.map((course, i) => (
              <option key={i}>{course.courseName || course.name || "Unnamed Course"}</option>
            ))}
          </select>
        </div>
      </nav>

      {/* Loading / Error States */}
      {status === "loading" && (
        <div className="uni-loading text-center py-10">Loading university data…</div>
      )}
      {status === "error" && (
        <div className="uni-error text-center py-10 text-red-500">
          Error: {error || "Unable to load university data. Please try again later."}
        </div>
      )}

      {status === "ready" && university && (
        <>
          {/* Banner */}
          <div
            className="uni-banner"
            style={{ backgroundImage: `url(${bannerImage})` }}
            role="img"
            aria-label="University banner"
          >
            <div className="uni-banner-content">
              <div className="uni-banner-lower">
                <img src={uniLogo} alt={`${university.instituteName} Logo`} className="uni-logo" />
                <div className="text-center">
                  <h1>{university.instituteName || "Unknown University"}</h1>
                  <p>
                    {university.city || "City"}, {university.state || "State"} | Est.{" "}
                    {university.year || "Unknown"}
                  </p>
                </div>
              </div>

              <div className="uni-banner-tags">
                <div className="flex space-x-1 flex-wrap">
                  {chips.map((chip, i) => (
                    <span key={i} className="uni-chip">
                      {chip}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-1">
                  {university.students && (
                    <span className="review">{university.students} students</span>
                  )}
                  {university.faculty && (
                    <span className="review">{university.faculty} faculty</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="uni-tabs">
            <div className="uni-tab-container">
              <button
                className="uni-tab-scroll"
                onClick={scrollLeft}
                aria-label="Scroll tabs left"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
              </button>

              <div ref={scrollRef} className="uni-tab-list">
                {[
                  "About",
                  "Info",
                  "Courses & Fees",
                  "Cutoff",
                  "Placements",
                  "Facilities",
                  "Gallery",
                  "Admission",
                  "Reviews",
                  "News & Articles",
                  "Q&A",
                ].map((section) => (
                  <button
                    key={section}
                    className={`uni-tab-btn ${activeSection === section ? "active" : ""}`}
                    onClick={() => setActiveSection(section)}
                    aria-current={activeSection === section ? "true" : "false"}
                  >
                    {section}
                  </button>
                ))}
              </div>

              <button
                className="uni-tab-scroll"
                onClick={scrollRight}
                aria-label="Scroll tabs right"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>

            <div className="uni-actions">
              <button aria-label="Apply for admission">Apply For Admission</button>
              <button className="primary" aria-label="Download brochure">
                Download Brochure
              </button>
              <button className="primary" aria-label="View nearby colleges">
                More Nearby Colleges
              </button>
            </div>

            {/* Dynamic Sections */}
            <div className="uni-section">
              {activeSection === "About" && <AboutUs university={university} />}
              {activeSection === "Info" && <Info university={university} />}
              {activeSection === "Courses & Fees" && (
                <div className="uni-courses-container">
                  <h2 className="uni-courses-title">Courses Offered</h2>
                  <div className="uni-courses-table-wrapper">
                    <table className="uni-courses-table">
                      <thead className="uni-courses-header">
                        <tr>
                          <th className="uni-courses-th">Course Name</th>
                          <th className="uni-courses-th">Total Fees</th>
                          <th className="uni-courses-th">Yearly Fees</th>
                          <th className="uni-courses-th">Duration</th>
                          <th className="uni-courses-th">Intake</th>
                          <th className="uni-courses-th">Apply</th>
                        </tr>
                      </thead>
                      <tbody>
                        {university.courses?.length > 0 ? (
                          university.courses.map((course, i) => (
                            <tr key={i} className="uni-courses-row">
                              <td className="uni-courses-td">
                                {course.courseName || course.name || "Unnamed Course"}
                              </td>
                              <td className="uni-courses-td">
                                {course.totalFees ? `₹${course.totalFees}` : "N/A"}
                              </td>
                              <td className="uni-courses-td">
                                {course.yearlyFees ? `₹${course.yearlyFees}` : "N/A"}
                              </td>
                              <td className="uni-courses-td">{course.duration || "N/A"}</td>
                              <td className="uni-courses-td">{course.intake || "N/A"}</td>
                              <td className="uni-courses-td">
                                {course.applyLink ? (
                                  <a
                                    href={course.applyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="uni-courses-apply-button"
                                    aria-label={`Apply for ${course.courseName || course.name}`}
                                  >
                                    Apply Now
                                  </a>
                                ) : (
                                  <span className="text-gray-500">N/A</span>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="uni-courses-no-data">
                              No courses available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {activeSection === "Cutoff" && <Cutoff universityId={university._id} />}
              {activeSection === "Placements" && <Placement university={university} />}
              {activeSection === "Facilities" && <Facilities universityId={university._id} />}
              {activeSection === "Admission" && <Admission university={university} />}
              {activeSection === "Q&A" && <QA university={university} />}
              {activeSection === "Gallery" && (
                <Gallery universityId={university._id} darkMode={darkMode} />
              )}
              {activeSection === "Reviews" && <Reviews university={university} />}
              {activeSection === "News & Articles" && <NewsArticles university={university} />}
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default UniversityPage;