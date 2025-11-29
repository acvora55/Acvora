// Examain.jsx (Final Version — dynamic exams, filters, tabs & bottom bar restored)
import React, { useState, useEffect } from "react";
import { ChevronDown, Check, Filter, Search, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "../components/Footer";
import axios from "axios";

/* -------------------- Reusable Dropdown -------------------- */
const CustomDropdown = ({ title, options, selectedValues, setSelectedValues }) => {
  const [open, setOpen] = useState(false);

  const toggleOption = (option) => {
    if (selectedValues.includes(option)) {
      setSelectedValues(selectedValues.filter((v) => v !== option));
    } else {
      setSelectedValues([...selectedValues, option]);
    }
  };

  return (
    <div className="mb-4 relative w-full">
      <label className="text-yellow-500 font-bold mb-1 block text-sm sm:text-base">{title}</label>

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg border bg-white shadow-sm"
      >
        <span>{selectedValues.length > 0 ? selectedValues.join(", ") : `Select ${title}`}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${
                  selectedValues.includes(option) ? "bg-yellow-100" : "hover:bg-yellow-50"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                    selectedValues.includes(option)
                      ? "bg-yellow-500 border-yellow-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedValues.includes(option) && <Check className="h-3 w-3 text-white" />}
                </div>
                <span>{option}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* -------------------- Exam Card -------------------- */
const ExamCard = ({ exam, isSelected, toggleSelect, isSaved, toggleSave }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className={`border-2 border-yellow-300 rounded-2xl bg-white shadow-md mb-4 transition-all ${
      isSelected ? "ring-4 ring-yellow-500 border-yellow-500" : "hover:shadow-xl"
    }`}
  >
    <div className="p-4 flex flex-col sm:flex-row justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleSelect(exam._id)}
            className="accent-yellow-500"
          />
          <span className="font-semibold">Select</span>

          <button
            onClick={() => toggleSave(exam._id)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <Bookmark
              className={`h-5 w-5 ${
                isSaved ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        <h3 className="text-lg font-extrabold text-gray-900">{exam.examName}</h3>
        <p className="text-sm text-gray-700">
          Conducting Body: <span className="font-semibold">{exam.conductingBody}</span>
        </p>
        <p className="text-sm text-gray-700">
          Next Event:{" "}
          <span className="font-semibold text-yellow-600">{exam.nextEvent}</span>
        </p>
        <p className="text-sm text-gray-700">
          Mode & Level: <span className="font-semibold">{exam.modeLevel}</span>
        </p>
      </div>

      {/* BUTTONS (Reduced Height) */}
      <div className="flex flex-wrap gap-2 self-end sm:self-auto">
        <button className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg shadow font-semibold text-xs">
          Details
        </button>
        <button className="bg-gray-900 text-white px-3 py-1 rounded-lg font-semibold text-xs">
          Apply
        </button>
        <button className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg font-semibold text-xs">
          Set Alert
        </button>
      </div>
    </div>
  </motion.div>
);

/* -------------------- MAIN COMPONENT -------------------- */
const Examain = () => {
  /* FILTERS (unchanged) */
  const allStates = ["Andhra Pradesh", "Bihar", "Karnataka", "Maharashtra", "West Bengal", "Delhi"];
  const filters = {
    stream: ["Engineering", "Medical", "Law", "Commerce"],
    level: ["UG", "PG"],
    examType: ["National", "State", "Scholarship"],
    mode: ["Online", "Offline"],
    dateRange: ["Next 3 months", "Next 6 months"],
  };

  /* Filter states */
  const [selectedStateFilter, setSelectedStateFilter] = useState([]);
  const [selectedStream, setSelectedStream] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedExamType, setSelectedExamType] = useState([]);
  const [selectedMode, setSelectedMode] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState([]);

  /* Data */
  const [examData, setExamData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /* Dummy selection states */
  const [compareSelected, setCompareSelected] = useState([]);
  const [savedExams, setSavedExams] = useState([]);

  /* NEW — Tab state */
  const [activeTab, setActiveTab] = useState("Upcoming");

  const [filterOpen, setFilterOpen] = useState(false);

  /* -------------------- FETCH EXAMS -------------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://acvora-07fo.onrender.com/api/exams");

        const formatDate = (dateStr) =>
          new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });

        const mapped = res.data.map((e) => ({
          _id: e._id,
          examName: e.examName || e.resultExamName || "Untitled Exam",
          conductingBody: e.conductingBody || "Not Provided",
          examDate: e.examDate || null,
          applicationDeadline: e.applicationDeadline || null,
          nextEvent:
            e.applicationDeadline
              ? `Registration Open - ${formatDate(e.applicationDeadline)}`
              : e.examDate
              ? `Exam Date - ${formatDate(e.examDate)}`
              : "No Event",
          modeLevel: e.modeLevel || "Not Provided",
        }));

        setExamData(mapped);
      } catch (err) {
        console.error("Error fetching exams:", err);
      }
    };

    fetchData();
  }, []);

  /* -------------------- LIVE UPDATE FROM FORM -------------------- */
  useEffect(() => {
    const formatDate = (dateStr) =>
      new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });

    const handler = (ev) => {
      const e = ev.detail;

      const mapped = {
        _id: e._id || Date.now(),
        examName: e.examName || e.resultExamName || "Untitled Exam",
        conductingBody: e.conductingBody || "User Submitted",
        examDate: e.examDate || null,
        applicationDeadline: e.applicationDeadline || null,
        nextEvent:
          e.applicationDeadline
            ? `Registration Open - ${formatDate(e.applicationDeadline)}`
            : e.examDate
            ? `Exam Date - ${formatDate(e.examDate)}`
            : "New Exam Added",
        modeLevel: e.modeLevel || "Not Provided",
      };

      setExamData((prev) => [mapped, ...prev]);
    };

    window.addEventListener("exam-added", handler);
    return () => window.removeEventListener("exam-added", handler);
  }, []);

  /* -------------------- TAB FILTER LOGIC -------------------- */
  const today = new Date();

  const tabFilteredExams = examData.filter((exam) => {
    // Pick date priority
    const date = exam.examDate || exam.applicationDeadline;

    if (!date) return activeTab === "Upcoming";

    const examDate = new Date(date);

    if (activeTab === "Upcoming") return examDate > today;
    if (activeTab === "Ongoing")
      return (
        examDate.getFullYear() === today.getFullYear() &&
        examDate.getMonth() === today.getMonth()
      );
    if (activeTab === "Past") return examDate < today;

    return true;
  });

  /* -------------------- SEARCH + TAB FINAL FILTER -------------------- */
  const visibleExams = tabFilteredExams.filter((exam) =>
    exam.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* -------------------- PAGE UI -------------------- */
  return (
    <>
      <Navbar />

      <div className="pt-24 min-h-screen bg-gray-100 flex flex-col md:flex-row pb-32">

        {/* Mobile Filter */}
        <div className="md:hidden p-4 flex justify-end">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded-md"
          >
            <Filter /> Filters
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`${filterOpen ? "block" : "hidden"} md:block w-full md:w-72 p-4 bg-gray-50 border-r`}
        >
          <CustomDropdown title="State" options={allStates} selectedValues={selectedStateFilter} setSelectedValues={setSelectedStateFilter} />
          <CustomDropdown title="Stream" options={filters.stream} selectedValues={selectedStream} setSelectedValues={setSelectedStream} />
          <CustomDropdown title="Level" options={filters.level} selectedValues={selectedLevel} setSelectedValues={setSelectedLevel} />
          <CustomDropdown title="Exam Type" options={filters.examType} selectedValues={selectedExamType} setSelectedValues={setSelectedExamType} />
          <CustomDropdown title="Mode" options={filters.mode} selectedValues={selectedMode} setSelectedValues={setSelectedMode} />
          <CustomDropdown title="Date Range" options={filters.dateRange} selectedValues={selectedDateRange} setSelectedValues={setSelectedDateRange} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-10">

          {/* Search */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search Exam by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 rounded-md border pr-10"
            />
            <Search className="absolute right-3 top-3 text-gray-500" />
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b pb-3 mb-6">
            {["Upcoming", "Ongoing", "Past"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm sm:text-base font-semibold transition ${
                  activeTab === tab ? "text-yellow-600 border-b-4 border-yellow-500" : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <h1 className="text-3xl font-extrabold mb-6">University Exams Dashboard</h1>

          {visibleExams.length === 0 ? (
            <p className="text-gray-600">No exams found for this category.</p>
          ) : (
            visibleExams.map((exam) => (
              <ExamCard
                key={exam._id}
                exam={exam}
                isSelected={compareSelected.includes(exam._id)}
                toggleSelect={(id) =>
                  setCompareSelected((prev) =>
                    prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
                  )
                }
                isSaved={savedExams.includes(exam._id)}
                toggleSave={(id) =>
                  setSavedExams((prev) =>
                    prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
                  )
                }
              />
            ))
          )}
        </main>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-yellow-500 border-t border-yellow-500 shadow-lg z-50 flex flex-col sm:flex-row items-center justify-center gap-4 py-3 px-4">

        <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-md font-semibold">
          Set Alerts
        </button>

        <button
          disabled={compareSelected.length < 2}
          className={`px-4 py-2 rounded-md font-semibold ${
            compareSelected.length < 2
              ? "bg-yellow-300 text-gray-600 cursor-not-allowed"
              : "bg-yellow-500 text-gray-900"
          }`}
        >
          Compare Exams ({compareSelected.length})
        </button>

        <button
          disabled={compareSelected.length === 0}
          className={`px-4 py-2 rounded-md font-semibold ${
            compareSelected.length === 0
              ? "bg-yellow-300 text-gray-900 cursor-not-allowed"
              : "bg-yellow-500 text-gray-900"
          }`}
        >
          Download Calendar
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Examain;
