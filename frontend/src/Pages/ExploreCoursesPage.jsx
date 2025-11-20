import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ExploreCoursesPage.css";
import Navbar from "../components/Navbar";

const CourseExplorer = () => {
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [filters, setFilters] = useState({
    streams: [],
    courseType: [],
    courseLevel: [],
    states: [],
    cities: [],
    exams: [],
    courses: [],
    specializations: [],
  });
  const [loading, setLoading] = useState(true);
  const [availableStreams, setAvailableStreams] = useState([]);
  const [availableCourseTypes, setAvailableCourseTypes] = useState([]);
  const [availableLevels, setAvailableLevels] = useState([]);
  const [availableExams, setAvailableExams] = useState([]);
  const [availableSpecializations, setAvailableSpecializations] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [availableStates, setAvailableStates] = useState([]);
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [savedCourses, setSavedCourses] = useState(new Set());
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "https://acvora-07fo.onrender.com/api/courses"
        );
        const data = res.data || [];
        setCourses(data);
        setAvailableStreams([...new Set(data.map((c) => c.stream))].sort());
        setAvailableCourseTypes(
          [...new Set(data.map((c) => c.degreeType))].sort()
        );
        setAvailableLevels([...new Set(data.map((c) => c.level))].sort());
        setAvailableExams(
          [...new Set(data.flatMap((c) => c.exams || []))].sort()
        );
        setAvailableSpecializations(
          [
            ...new Set(
              data.flatMap((c) => (c.specializations || []).map((s) => s.name))
            ),
          ].sort()
        );
        setAvailableCities(
          [...new Set(data.map((c) => c.city).filter(Boolean))].sort()
        );
        setAvailableStates(
          [...new Set(data.map((c) => c.state).filter(Boolean))].sort()
        );
      } catch (err) {
        console.error("Error fetching courses:", err);
        // graceful fallback
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("savedCourses");
    if (saved) {
      try {
        const savedArray = JSON.parse(saved);
        setSavedCourses(new Set(savedArray.map((c) => c._id || c.id)));
      } catch (e) {
        console.warn("Could not parse savedCourses from localStorage");
      }
    }

    const uid = localStorage.getItem("userId");
    if (uid) {
      setUserId(uid);
      axios
        .get(`https://acvora-07fo.onrender.com/api/savedCourses/${uid}`)
        .then((res) => {
          // backend returns array of saved course objects
          setSavedCourses(new Set(res.data.map((c) => c.courseId.toString())));
        })
        .catch((err) => {
          console.error("Error fetching saved courses:", err);
        });
    }
  }, []);

  const toggleAccordion = (category) =>
    setActiveAccordion((prev) => (prev === category ? null : category));

  const handleFilterChange = (category, value, isMulti = true) => {
    setFilters((prev) => {
      if (!isMulti) {
        return { ...prev, [category]: value ? [value] : [] };
      }
      const present = prev[category].includes(value);
      return {
        ...prev,
        [category]: present
          ? prev[category].filter((v) => v !== value)
          : [...prev[category], value],
      };
    });
  };

  const handleCourseClick = (courseId) =>
    setExpandedCourseId((prev) => (prev === courseId ? null : courseId));

  const handleSaveToggle = async (course) => {
    if (!userId) {
      alert("Please login to save courses");
      navigate("/login");
      return;
    }

    const courseId = (course._id || course.id).toString();
    const isSaved = savedCourses.has(courseId);

    try {
      if (isSaved) {
        await axios.delete(
          `https://acvora-07fo.onrender.com/api/savedCourses/${userId}/${courseId}`
        );
        setSavedCourses((prev) => {
          const newSet = new Set(prev);
          newSet.delete(courseId);
          return newSet;
        });
      } else {
        await axios.post(
          `https://acvora-07fo.onrender.com/api/savedCourses/${userId}`,
          {
            courseId: course._id || course.id,
            courseTitle: course.courseTitle,
            eligibility: course.eligibility,
          }
        );
        setSavedCourses((prev) => new Set([...prev, courseId]));
      }
    } catch (err) {
      console.error("Error toggling saved course:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.courseTitle
      .toLowerCase()
      .includes(searchText.toLowerCase());
    if (filters.specializations.length > 0) {
      return (
        matchesSearch &&
        course.specializations &&
        course.specializations.some((spec) =>
          filters.specializations.includes(spec.name)
        )
      );
    }
    const matchesFilters =
      (!filters.streams.length || filters.streams.includes(course.stream)) &&
      (!filters.courseType.length ||
        filters.courseType.includes(course.degreeType)) &&
      (!filters.courseLevel.length || filters.courseLevel.includes(course.level)) &&
      (!filters.exams.length ||
        (course.exams && course.exams.some((exam) => filters.exams.includes(exam)))) &&
      (!filters.courses.length ||
        filters.courses.includes(course.courseTitle)) &&
      (!filters.states.length || filters.states.includes(course.state)) &&
      (!filters.cities.length || filters.cities.includes(course.city));
    return matchesSearch && matchesFilters;
  });

  /* ----------------
     UI Subcomponents
     (unchanged card logic — styling updated via CSS)
     ----------------*/
  const SidebarFilters = () => {
    const filterCategories = [
      { key: "streams", label: "Stream", options: availableStreams },
      { key: "courseType", label: "Course Type", options: availableCourseTypes },
      { key: "courseLevel", label: "Course Level", options: availableLevels },
    ];
    return (
      <aside className="ce-sidebar md:w-1/4">
        <div className="ce-sidebar-header">
          <h2>Filters</h2>
          <button
            className="ce-clear-filters"
            onClick={() =>
              setFilters({
                streams: [],
                courseType: [],
                courseLevel: [],
                states: [],
                cities: [],
                exams: [],
                courses: [],
                specializations: [],
              })
            }
            title="Clear all filters"
          >
            Clear
          </button>
        </div>

        {filterCategories.map((category) => (
          <div key={category.key} className="ce-accordion">
            <button
              onClick={() => toggleAccordion(category.key)}
              className="ce-accordion-btn"
              aria-expanded={activeAccordion === category.key}
            >
              <span>{category.label}</span>
              <span className="ce-accordion-caret">
                {activeAccordion === category.key ? "▲" : "▼"}
              </span>
            </button>
            {activeAccordion === category.key && (
              <div className="ce-accordion-options">
                {category.options.length === 0 ? (
                  <div className="ce-empty-option">No options</div>
                ) : (
                  category.options.map((option) => (
                    <label className="ce-option-row" key={option}>
                      <input
                        type="checkbox"
                        checked={filters[category.key].includes(option)}
                        onChange={() => handleFilterChange(category.key, option)}
                      />
                      <span className="ce-option-label">{option}</span>
                    </label>
                  ))
                )}
              </div>
            )}
          </div>
        ))}

        {/* quick extra filters */}
        <div className="ce-accordion">
          <button
            onClick={() => toggleAccordion("exams")}
            className="ce-accordion-btn"
            aria-expanded={activeAccordion === "exams"}
          >
            <span>Entrance / Exams</span>
            <span>{activeAccordion === "exams" ? "▲" : "▼"}</span>
          </button>
          {activeAccordion === "exams" && (
            <div className="ce-accordion-options">
              {availableExams.map((ex) => (
                <label key={ex} className="ce-option-row">
                  <input
                    type="checkbox"
                    checked={filters.exams.includes(ex)}
                    onChange={() => handleFilterChange("exams", ex)}
                  />
                  <span className="ce-option-label">{ex}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </aside>
    );
  };

  const SearchFilters = () => {
    const topFilters = [
      { key: "courses", label: "Course", options: courses.map((c) => c.courseTitle) },
      { key: "states", label: "State", options: availableStates },
      { key: "cities", label: "City", options: availableCities },
      { key: "exams", label: "Entrance/Exam Accepted", options: availableExams },
    ];
    return (
      <div className="ce-searchbar">
        <div className="ce-search-top">
          <div className="ce-search-left">
            <input
              type="text"
              placeholder="Find your desired course (e.g. B.Tech, MBA, Data Science)"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="ce-search-input"
            />
            <button
              className="ce-btn-orange"
              onClick={() => {
                /* we already filter locally; keep for potential analytics */
              }}
            >
              Search
            </button>
          </div>

          <div className="ce-search-right">
            <div className="ce-stats">
              <div className="ce-stat">
                <div className="ce-stat-number">
                  {loading ? "—" : courses.length}
                </div>
                <div className="ce-stat-label">Total courses</div>
              </div>
              <div className="ce-stat">
                <div className="ce-stat-number">{filteredCourses.length}</div>
                <div className="ce-stat-label">Matching</div>
              </div>
            </div>

            <div className="ce-sort">
              <label className="ce-sort-label">Sort:</label>
              <select
                className="ce-sort-select"
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "alpha") {
                    setCourses((prev) =>
                      [...prev].sort((a, b) =>
                        (a.courseTitle || "").localeCompare(b.courseTitle || "")
                      )
                    );
                  } else if (val === "duration") {
                    setCourses((prev) =>
                      [...prev].sort(
                        (a, b) =>
                          (a.duration && parseFloat(a.duration)) -
                          (b.duration && parseFloat(b.duration))
                      )
                    );
                  } else {
                    // default - no-op
                  }
                }}
              >
                <option value="">Recommended</option>
                <option value="alpha">A → Z</option>
                <option value="duration">Duration (short → long)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="ce-top-filters">
          {topFilters.map((filter) => (
            <select
              key={filter.key}
              onChange={(e) => handleFilterChange(filter.key, e.target.value, false)}
              className="ce-top-filter-select"
              value={filters[filter.key][0] || ""}
            >
              <option value="">{filter.label}</option>
              {filter.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>
    );
  };

  const SpecializationsSection = () => {
    let filteredSpecs = [];
    if (filters.courses.length > 0) {
      const selectedCourses = courses.filter((course) =>
        filters.courses.includes(course.courseTitle)
      );
      filteredSpecs = [
        ...new Set(
          selectedCourses.flatMap((course) =>
            (course.specializations || []).map((spec) => spec.name)
          )
        ),
      ].sort();
    } else {
      const filteredCourses = courses.filter(
        (course) =>
          (!filters.streams.length || filters.streams.includes(course.stream)) &&
          (!filters.courseType.length ||
            filters.courseType.includes(course.degreeType))
      );
      filteredSpecs = [
        ...new Set(
          filteredCourses.flatMap((course) =>
            (course.specializations || []).map((spec) => spec.name)
          )
        ),
      ].sort();
    }
    if (filteredSpecs.length === 0) return null;
    return (
      <div className="ce-specializations mt-4">
        <div className="ce-spec-header">
          <strong>Specializations</strong>
          <span className="ce-spec-sub">Choose one or more</span>
        </div>
        <div className="ce-spec-list">
          {filteredSpecs.map((spec) => (
            <button
              type="button"
              key={spec}
              className={`ce-spec-tag ${
                filters.specializations.includes(spec) ? "active" : ""
              }`}
              onClick={() => handleFilterChange("specializations", spec)}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const BookmarkIcon = ({ isSaved }) => (
    <div
      className={`ce-save-icon-wrapper ${isSaved ? "saved" : ""}`}
      title={isSaved ? "Saved" : "Save Course"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isSaved ? "#f97316" : "none"}
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke={isSaved ? "#f97316" : "#374151"}
        className="ce-save-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5v14l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
        />
      </svg>
    </div>
  );

  const CourseCard = ({ course, isSaved, onSaveToggle }) => {
    const id = course._id || course.id;

    return (
      <div className="ce-course-card cursor-pointer" onClick={() => handleCourseClick(id)}>
        <h3 className="ce-course-title">{course.courseTitle}</h3>
        <div className="ce-tags">
          {[course.duration, course.degreeType, course.level].filter(Boolean).map((tag) => (
            <span key={tag} className="ce-tag">{tag}</span>
          ))}
        </div>
        <p className="ce-eligibility"><strong>Eligibility:</strong> {course.eligibility}</p>
        <p className="ce-description">{course.description}</p>
        <div className="ce-specializations">
          {course.specializations?.map((spec, idx) => (
            <span key={idx} className="ce-spec">{spec.name}</span>
          ))}
        </div>

        {expandedCourseId === id && (
          <div className="ce-top-institutes mt-4 p-4 border-t border-gray-200 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-lg mb-3">
              Top Institutes Offering {course.courseTitle}
            </h4>
            {Array.isArray(course.topInstituteImages) && course.topInstituteImages.length > 0 ? (
              <div className="flex flex-wrap gap-6">
                {course.topInstituteImages.map((inst, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 bg-white shadow-sm rounded-lg p-2 hover:shadow-md transition"
                  >
                    <img
                      src={inst.url ? `https://acvora-07fo.onrender.com/${inst.url}` : "/default-logo.png"}
                      alt={inst.description || "Institute"}
                      className="w-16 h-16 rounded-full object-cover border border-gray-300"
                      onError={(e) => (e.target.src = "/default-logo.png")}
                    />
                    <span className="font-medium text-gray-800 text-base">
                      {inst.description || "Unknown Institute"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No top institutes data available.</p>
            )}
          </div>
        )}

        <div className="ce-card-footer">
          <button
            className="ce-save-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSaveToggle(course);
            }}
            aria-label="Save course"
          >
            <BookmarkIcon isSaved={isSaved} />
          </button>
          <div className="ce-footer-actions">
            <button
              className="ce-link"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/coursepage/${id}`);
              }}
            >
              View Course
            </button>
            <button
              className="ce-btn-apply"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/apply/${id}`);
              }}
            >
              Apply Now →
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* ----------------
     Page Render
     ----------------*/
  return (
    <>
      <Navbar />
      <div className="course-explorer">
        <div className="ce-main container">
          <header className="ce-header">
            <h1 className="ce-title">Top Courses in Indian Colleges 2025</h1>
            <p className="ce-subtitle">Explore degrees, specializations & top institutes — filter to refine results.</p>
          </header>

          <div className="flex flex-col md:flex-row gap-6">
            <SidebarFilters />
            <main className="md:w-3/4">
              <SearchFilters />
              {(filters.streams.length > 0 || filters.courses.length > 0) && <SpecializationsSection />}

              <div className="ce-list grid grid-cols-1 gap-6">
                {loading ? (
                  <div className="ce-loading">Loading courses...</div>
                ) : filteredCourses.length === 0 ? (
                  <div className="ce-empty">No courses found.</div>
                ) : (
                  filteredCourses.map((course) => (
                    <CourseCard
                      key={course._id || course.id}
                      course={course}
                      isSaved={savedCourses.has((course._id || course.id).toString())}
                      onSaveToggle={handleSaveToggle}
                    />
                  ))
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseExplorer;
