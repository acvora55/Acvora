import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsAlerts() {
  const [newsTab, setNewsTab] = useState("news");
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  const alertsData = [
    { text: "New semester starts from Sept 1, 2025" },
    { text: "Hostel fee payment due by Sept 5, 2025" },
    { text: "Internship registrations open now" },
    { text: "Campus fest on Sept 20, 2025" },
  ];

  const data = {
    news: [
      { text: "University ranked #1 in national survey", link: "#" },
      { text: "New research labs inaugurated last week", link: "#" },
      { text: "Scholarship results declared – check portal", link: "#" },
    ],
    alerts: alertsData,
    blogs: [
      { text: "5 Tips to Ace Your Exams", link: "#" },
      { text: "Top 10 Career Options in 2025", link: "#" },
      { text: "Why Networking is Important", link: "#" },
    ],
  };

  const scrollVariants = {
    animate: {
      y: ["0%", "-50%"],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 10,
          ease: "linear",
        },
      },
    },
    pause: {
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="bg-gray-900 text-gray-800 py-16 px-4 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Deadlines & Alerts */}
        <div className="bg-white rounded-3xl border border-yellow-200 shadow-lg p-8 flex-1 space-y-8">
          {/* Deadlines */}
          <div>
            <h4 className="text-xl font-bold flex items-center gap-2 text-yellow-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              Important Deadlines
            </h4>
            <ul className="text-gray-600 space-y-3">
              {[
                { text: "Scholarship Application Deadline: Aug 31, 2025" },
                { text: "Course Registration Closes: Sept 15, 2025" },
                { text: "Final Exams Start: Dec 10, 2025" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Alerts */}
          <div>
            <h4 className="text-xl font-bold flex items-center gap-2 text-yellow-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
              Latest Alerts
            </h4>
            <ul className="space-y-3 text-gray-600">
              {alertsData.slice(0, 3).map((alert, i) => (
                <li key={i} className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  {alert.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* News / Alerts / Blogs Tabs */}
        <div className="w-full max-w-md flex flex-col flex-1">
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-t-xl overflow-hidden shadow-md">
            {["news", "alerts", "blogs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setNewsTab(tab)}
                className={`flex-1 px-4 py-3 font-semibold text-sm transition-all ${
                  newsTab === tab
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-yellow-500"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div
            ref={containerRef}
            className="bg-white border-t-2 border-yellow-600 p-4 h-64 overflow-hidden relative rounded-b-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={newsTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-4"
              >
                <motion.div
                  ref={scrollRef}
                  variants={scrollVariants}
                  animate={isHovered ? "pause" : "animate"}
                >
                  {data[newsTab].map((item, idx) => (
                    <div key={idx} className="py-2 border-b border-dotted border-gray-300 last:border-0">
                      <a
                        href={item.link}
                        className="text-gray-700 hover:text-yellow-700 transition-colors block leading-tight"
                      >
                        {item.text}
                      </a>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* View All Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 text-white px-6 py-3 mt-6 rounded-full font-semibold shadow-md hover:bg-yellow-600 transition-colors self-start flex items-center gap-2"
          >
            <span>View All</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
