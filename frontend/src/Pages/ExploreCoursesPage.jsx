import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ExploreCoursesPage.css';
import Navbar from "../components/Navbar";

const CourseExplorer = () => {
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState('');
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
  // ✅ New: userId state
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('https://acvora-07fo.onrender.com/api/courses');
        const data = res.data;
        console.log('First course in response:', data[0]); // Inspect first item
        setCourses(data);
        setAvailableStreams([...new Set(data.map(c => c.stream))].sort());
        setAvailableCourseTypes([...new Set(data.map(c => c.degreeType))].sort());
        setAvailableLevels([...new Set(data.map(c => c.level))].sort());
        setAvailableExams([...new Set(data.flatMap(c => c.exams || []))].sort());
        setAvailableSpecializations([
          ...new Set(data.flatMap(c => (c.specializations || []).map(spec => spec.name)))
        ].sort());
        setAvailableCities([...new Set(data.map(c => c.city).filter(Boolean))].sort());
        setAvailableStates([...new Set(data.map(c => c.state).filter(Boolean))].sort());
      } catch (err) {
        console.error('Error fetching courses:', err);
        const sampleData = [];
        setCourses(sampleData);
        setAvailableStreams([...new Set(sampleData.map(c => c.stream))].sort());
        setAvailableCourseTypes([...new Set(sampleData.map(c => c.degreeType))].sort());
        setAvailableLevels([...new Set(sampleData.map(c => c.level))].sort());
        setAvailableExams([...new Set(sampleData.flatMap(c => c.exams || []))].sort());
        setAvailableSpecializations([
          ...new Set(sampleData.flatMap(c => (c.specializations || []).map(spec => spec.name)))
        ].sort());
        setAvailableCities([...new Set(sampleData.map(c => c.city).filter(Boolean))].sort());
        setAvailableStates([...new Set(sampleData.map(c => c.state).filter(Boolean))].sort());
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // ✅ Updated: Load saved courses (API + localStorage fallback)
  useEffect(() => {
    // Fallback to localStorage
    const saved = localStorage.getItem("savedCourses");
    if (saved) {
      const savedArray = JSON.parse(saved);
      setSavedCourses(new Set(savedArray.map(c => c._id || c.id)));
    }

    // Fetch from backend if logged in
    const uid = localStorage.getItem("userId");
    if (uid) {
      setUserId(uid);
      axios.get(`https://acvora-07fo.onrender.com/api/savedCourses/${uid}`)
        .then(res => {
          setSavedCourses(new Set(res.data.map(c => c.courseId.toString())));
        })
        .catch(err => {
          console.error('Error fetching saved courses:', err);
          // Fallback to localStorage already handled above
        });
    }
  }, []);

  const toggleAccordion = (category) => {
    setActiveAccordion(activeAccordion === category ? null : category);
  };

  const handleFilterChange = (category, value, isMulti = true) => {
    setFilters(prev => {
      if (!isMulti) {
        return { ...prev, [category]: value ? [value] : [] };
      }
      return {
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter(v => v !== value)
          : [...prev[category], value],
      };
    });
  };

  const handleCourseClick = (courseId) => {
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  };

  // ✅ Updated: Use API for toggle
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
        // Remove
        await axios.delete(`https://acvora-07fo.onrender.com/api/savedCourses/${userId}/${courseId}`);
        setSavedCourses(prev => {
          const newSet = new Set(prev);
          newSet.delete(courseId);
          return newSet;
        });
      } else {
        // Add
        await axios.post(`https://acvora-07fo.onrender.com/api/savedCourses/${userId}`, {
          courseId: course._id || course.id,
          courseTitle: course.courseTitle,
          eligibility: course.eligibility
        });
        setSavedCourses(prev => new Set([...prev, courseId]));
      }
    } catch (err) {
      console.error('Error toggling saved course:', err);
      alert("Something went wrong. Please try again.");
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.courseTitle.toLowerCase().includes(searchText.toLowerCase());
    if (filters.specializations.length > 0) {
      return matchesSearch && 
        (course.specializations &&
          course.specializations.some(spec => filters.specializations.includes(spec.name)));
    }
    const matchesFilters =
      (!filters.streams.length || filters.streams.includes(course.stream)) &&
      (!filters.courseType.length || filters.courseType.includes(course.degreeType)) &&
      (!filters.courseLevel.length || filters.courseLevel.includes(course.level)) &&
      (!filters.exams.length || (course.exams && course.exams.some(exam => filters.exams.includes(exam)))) &&
      (!filters.courses.length || filters.courses.includes(course.courseTitle)) &&
      (!filters.states.length || filters.states.includes(course.state)) &&
      (!filters.cities.length || filters.cities.includes(course.city));
    return matchesSearch && matchesFilters;
  });

  const SidebarFilters = () => {
    const filterCategories = [
      { key: 'streams', label: 'Stream', options: availableStreams },
      { key: 'courseType', label: 'Course Type', options: availableCourseTypes },
      { key: 'courseLevel', label: 'Course Level', options: availableLevels },
    ];
    return (
      <div className="ce-sidebar md:w-1/4">
        <h2>Filters</h2>
        {filterCategories.map(category => (
          <div key={category.key} className="ce-accordion">
            <button onClick={() => toggleAccordion(category.key)} className="ce-accordion-btn">
              {category.label}
              <span>{activeAccordion === category.key ? '▲' : '▼'}</span>
            </button>
            {activeAccordion === category.key && (
              <div className="ce-accordion-options">
                {category.options.map(option => (
                  <label key={option}>
                    <input
                      type="checkbox"
                      checked={filters[category.key].includes(option)}
                      onChange={() => handleFilterChange(category.key, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const SearchFilters = () => {
    const topFilters = [
      { key: 'courses', label: 'Course', options: courses.map(c => c.courseTitle) },
      { key: 'states', label: 'State', options: availableStates },
      { key: 'cities', label: 'City', options: availableCities },
      { key: 'exams', label: 'Entrance/Exam Accepted', options: availableExams },
    ];
    return (
      <div className="ce-searchbar">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Find your desired course"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="ce-search-input"
          />
          <button className="ce-btn-orange">Search</button>
        </div>
        <div className="ce-top-filters">
          {topFilters.map(filter => (
            <select
              key={filter.key}
              onChange={(e) => handleFilterChange(filter.key, e.target.value, false)}
            >
              <option value="">{filter.label}</option>
              {filter.options.map(option => (
                <option key={option} value={option}>{option}</option>
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
      const selectedCourses = courses.filter(course => filters.courses.includes(course.courseTitle));
      filteredSpecs = [
        ...new Set(selectedCourses.flatMap(course => (course.specializations || []).map(spec => spec.name)))
      ].sort();
    } else {
      const filteredCourses = courses.filter(course => 
        (!filters.streams.length || filters.streams.includes(course.stream)) &&
        (!filters.courseType.length || filters.courseType.includes(course.degreeType))
      );
      filteredSpecs = [
        ...new Set(filteredCourses.flatMap(course => (course.specializations || []).map(spec => spec.name)))
      ].sort();
    }
    if (filteredSpecs.length === 0) return null;
    return (
      <div className="ce-specializations mt-4">
        <span className="font-bold mr-2">Choose Specialization:</span>
        {filteredSpecs.map(spec => (
          <span
            key={spec}
            className={`ce-spec-tag inline-block px-3 py-1 mr-2 mb-2 rounded-full cursor-pointer ${filters.specializations.includes(spec) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => handleFilterChange('specializations', spec)}
          >
            {spec}
          </span>
        ))}
      </div>
    );
  };

  const BookmarkIcon = ({ isSaved }) => (
    <div
      className={`ce-save-icon-wrapper ${isSaved ? 'saved' : ''}`}
      title={isSaved ? 'Saved' : 'Save Course'}
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
      <div
        className="ce-course-card cursor-pointer"
        onClick={() => handleCourseClick(id)}
      >
        <h3 className="ce-course-title">{course.courseTitle}</h3>
        <div className="ce-tags">
          {[course.duration, course.degreeType, course.level].filter(Boolean).map(tag => (
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

        {/* Expanded section for top institutes */}
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
                e.stopPropagation(); // stop collapsing
                navigate(`/coursepage/${id}`);
              }}
            >
              View Course
            </button>
            <button
              className="ce-btn-apply"
              onClick={(e) => {
                e.stopPropagation(); // stop collapsing
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

  return (
    <>
    <Navbar/>
    <div className="course-explorer">
      <div className="ce-main">
        <h1 className="ce-title">Top Courses in Indian Colleges 2025</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <SidebarFilters />
          <div className="md:w-3/4">
            <SearchFilters />
            {(filters.streams.length > 0 || filters.courses.length > 0) && <SpecializationsSection />}
            <div className="grid grid-cols-1 gap-6">
              {loading ? (
                <p className="text-center text-gray-500 py-8">Loading courses...</p>
              ) : filteredCourses.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No courses found.</p>
              ) : (
                filteredCourses.map(course => (
                  <CourseCard
                    key={course._id || course.id}
                    course={course}
                    isSaved={savedCourses.has((course._id || course.id).toString())}
                    onSaveToggle={handleSaveToggle}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CourseExplorer;