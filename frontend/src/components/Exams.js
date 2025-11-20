import React, { useState, useEffect } from "react";
import { ChevronDown, Check, Filter, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "../components/Footer";

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
      <label className="text-yellow-500 font-bold mb-1 block text-sm sm:text-base">
        {title}
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:border-yellow-400 transition text-sm sm:text-base"
      >
        <span className="truncate">
          {selectedValues.length > 0 ? selectedValues.join(", ") : `Select ${title}`}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 mt-2 max-h-48 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg text-sm sm:text-base"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-yellow-50 ${
                  selectedValues.includes(option) ? "bg-yellow-100" : ""
                }`}
              >
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded border ${
                    selectedValues.includes(option)
                      ? "bg-yellow-500 border-yellow-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedValues.includes(option) && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
                <span className="text-gray-800">{option}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* -------------------- Exam Card -------------------- */
const ExamCard = ({
  examName,
  conductingBody,
  nextEvent,
  modeLevel,
  isSelected,
  toggleSelect,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className={`border border-gray-100 rounded-2xl bg-white shadow-md mb-4 sm:mb-6 overflow-hidden transition-all
        ${isSelected ? "ring-4 ring-yellow-500" : "hover:shadow-xl"}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 cursor-pointer gap-3 sm:gap-4">
        {/* Left section */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => {
                e.stopPropagation();
                toggleSelect(examName);
              }}
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer accent-yellow-500 w-4 h-4 sm:w-5 sm:h-5"
              id={`select-${examName}`}
            />
            <label
              htmlFor={`select-${examName}`}
              className="select-none text-gray-800 font-semibold cursor-pointer text-sm sm:text-base"
            >
              Select
            </label>
          </div>

          <h3 className="text-left font-extrabold text-base sm:text-lg md:text-xl text-gray-800">
            {examName}
          </h3>
          <p className="text-left text-gray-700 text-xs sm:text-sm">
            Conducting Body:{" "}
            <span className="font-semibold text-gray-900">{conductingBody}</span>
          </p>
          <p className="text-left text-gray-700 text-xs sm:text-sm">
            Next Event:{" "}
            <span className="font-semibold text-yellow-500">{nextEvent}</span>
          </p>
          <p className="text-left text-gray-700 text-xs sm:text-sm">
            Mode & Level:{" "}
            <span className="font-semibold text-gray-900">{modeLevel}</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-start sm:justify-end gap-2 sm:gap-3">
          <button
            type="button"
            className="bg-yellow-500 text-gray-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow hover:bg-yellow-400 font-semibold transition text-xs sm:text-sm"
          >
            Details
          </button>
          <button
            type="button"
            className="bg-gray-900 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow hover:bg-gray-800 font-semibold transition text-xs sm:text-sm"
          >
            Apply
          </button>
          <button
            type="button"
            className="bg-yellow-500 text-gray-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow hover:bg-yellow-400 font-semibold transition text-xs sm:text-sm"
          >
            Set Alert
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* -------------------- Main Component -------------------- */
const Examain = () => {
  const allStates = ["Andhra Pradesh", "Bihar", "Karnataka", "Maharashtra", "West Bengal", "Delhi"];
  const filters = {
    stream: ["Engineering", "Medical", "Law", "Commerce"],
    level: ["UG", "PG"],
    examType: ["National", "State", "Scholarship"],
    mode: ["Online", "Offline"],
    dateRange: ["Next 3 months", "Next 6 months"],
  };

  const [selectedStateFilter, setSelectedStateFilter] = useState([]);
  const [selectedStream, setSelectedStream] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedExamType, setSelectedExamType] = useState([]);
  const [selectedMode, setSelectedMode] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [compareSelected, setCompareSelected] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleCompare = (examName) => {
    if (compareSelected.includes(examName)) {
      setCompareSelected(compareSelected.filter((e) => e !== examName));
    } else {
      if (compareSelected.length < 3) setCompareSelected([...compareSelected, examName]);
      else alert("You can compare up to 3 exams only.");
    }
  };

  const examData = [
    { examName: "JEE Main", conductingBody: "NTA", nextEvent: "Registration Open – Jan 2026", modeLevel: "Online, UG", states: [] },
    { examName: "NEET", conductingBody: "NTA", nextEvent: "Exam – May 2026", modeLevel: "Offline, UG", states: [] },
    { examName: "MHT CET", conductingBody: "Maharashtra State", nextEvent: "Registration Open – Feb 2026", modeLevel: "Online, UG", states: ["Maharashtra"] },
  ];

  const visibleExams = examData.filter((exam) =>
    exam.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-gray-100 text-gray-900 flex flex-col md:flex-row pb-32">
        {/* Mobile filter toggle */}
        <div className="md:hidden p-4 flex justify-end">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 bg-yellow-500 text-gray-900 px-4 py-2 rounded-md font-semibold shadow hover:bg-yellow-400"
          >
            <Filter className="h-5 w-5" /> Filters
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`${
            filterOpen ? "block" : "hidden"
          } md:block w-full md:w-72 p-4 sm:p-6 border-b md:border-r border-gray-300 bg-gray-50 transition-all`}
        >
          <CustomDropdown title="State" options={allStates} selectedValues={selectedStateFilter} setSelectedValues={setSelectedStateFilter} />
          <CustomDropdown title="Stream" options={filters.stream} selectedValues={selectedStream} setSelectedValues={setSelectedStream} />
          <CustomDropdown title="Level" options={filters.level} selectedValues={selectedLevel} setSelectedValues={setSelectedLevel} />
          <CustomDropdown title="Exam Type" options={filters.examType} selectedValues={selectedExamType} setSelectedValues={setSelectedExamType} />
          <CustomDropdown title="Mode" options={filters.mode} selectedValues={selectedMode} setSelectedValues={setSelectedMode} />
          <CustomDropdown title="Date Range" options={filters.dateRange} selectedValues={selectedDateRange} setSelectedValues={setSelectedDateRange} />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 md:p-10 bg-gray-100 flex flex-col">
          {/* Search */}
          <section className="mb-6">
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Search Exam by Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:border-yellow-500 focus:outline-none shadow-sm text-gray-900 text-sm sm:text-base pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 sm:gap-3 border-b border-gray-300 pb-2 text-gray-900 text-sm sm:text-base">
              {["Upcoming", "Ongoing", "Past"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 font-semibold transition-colors ${
                    activeTab === tab
                      ? "border-b-4 border-yellow-500 text-yellow-500"
                      : "hover:text-yellow-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </section>

          {/* Header */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 sm:mb-6 text-gray-900 text-center md:text-left">
            University Exams Dashboard
          </h1>

          {/* Exam cards */}
          <div>
            {visibleExams.length === 0 ? (
              <p className="text-gray-700">No exams found.</p>
            ) : (
              visibleExams.map((exam) => (
                <ExamCard
                  key={exam.examName}
                  examName={exam.examName}
                  conductingBody={exam.conductingBody}
                  nextEvent={exam.nextEvent}
                  modeLevel={exam.modeLevel}
                  isSelected={compareSelected.includes(exam.examName)}
                  toggleSelect={toggleCompare}
                />
              ))
            )}
          </div>
        </main>
      </div>

      {/* Sticky bottom tools */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-yellow-500 shadow-lg border-t border-yellow-500 z-50 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-8 py-3 px-4">
        <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition text-sm sm:text-base">
          Set Alerts
        </button>
        <button
          disabled={compareSelected.length < 2}
          className={`px-4 py-2 rounded-md font-semibold transition text-sm sm:text-base ${
            compareSelected.length < 2
              ? "bg-yellow-300 text-gray-600 cursor-not-allowed"
              : "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
          }`}
        >
          Compare Exams ({compareSelected.length})
        </button>
        <button
          disabled={compareSelected.length === 0}
          className={`px-4 py-2 rounded-md font-semibold transition text-sm sm:text-base ${
            compareSelected.length === 0
              ? "bg-yellow-300 text-gray-900 cursor-not-allowed"
              : "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
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