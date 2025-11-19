import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image1 from "../Images/cloud.jpg";

const Cloud = () => {
  const currentDate = new Date();
  const [newsTab, setNewsTab] = useState("news");
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  const newsData = [
    { text: "University awarded top ranking for engineering program.", link: "#" },
    { text: "New research reveals breakthrough in renewable energy.", link: "#" },
    { text: "Student startup secures major funding round.", link: "#" },
    { text: "Faculty member receives prestigious national award.", link: "#" },
    { text: "Annual alumni gala raises record funds for scholarships.", link: "#" },
    { text: "New campus-wide shuttle service to launch next month.", link: "#" },
    { text: "Upcoming guest lecture by a Nobel laureate on climate change.", link: "#" },
    { text: "Renovations to campus gym to be completed by fall semester.", link: "#" },
    { text: "University hosts international conference on artificial intelligence.", link: "#" },
  ];

  const alertsData = [
    { text: "Campus library will be closed on Sept 5 for maintenance.", link: "#" },
    { text: "New COVID-19 guidelines effective from Oct 1.", link: "#" },
    { text: "Virtual career fair scheduled for Nov 20.", link: "#" },
    { text: "Severe weather alert: Campus closure expected tomorrow.", link: "#" },
    { text: "Important security update for all student portals.", link: "#" },
    { text: "Parking lot C will be closed for a special event this weekend.", link: "#" },
  ];

  const blogsData = [
    { text: "Navigating your first semester with confidence.", link: "#" },
    { text: "The future of higher education in a digital world.", link: "#" },
    { text: "How to ace your final exams: Tips and tricks.", link: "#" },
    { text: "Five ways to get involved in campus life.", link: "#" },
    { text: "From classroom to career: A student's journey.", link: "#" },
    { text: "The importance of mental health for students.", link: "#" },
  ];

  const data = { news: newsData, alerts: alertsData, blogs: blogsData };

  const scrollVariants = {
    animate: { y: ["0%", "-100%"], transition: { y: { duration: 20, ease: "linear", repeat: Infinity } } },
    pause: { y: null, transition: { duration: 0 } },
  };

  return (
    <section className="p-8 box-border bg-[#f0f4f8] min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-around gap-12">
        {/* Left Section: News/Alerts/Blogs */}
        <div className="space-y-6 lg:w-1/3">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Latest Updates from University
          </h2>

          {/* Tabs */}
          <div className="flex bg-white rounded-t-xl overflow-hidden shadow">
            {["news", "alerts", "blogs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setNewsTab(tab)}
                className={`flex-1 px-4 py-3 font-semibold text-sm transition-all ${
                  newsTab === tab
                    ? "bg-[#2563eb] text-white border-b-2 border-blue-400"
                    : "bg-white text-gray-500 hover:text-blue-600"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Scrollable Content */}
          <div
            ref={containerRef}
            className="bg-white border-t-2 border-blue-400 p-4 h-64 overflow-hidden relative rounded-b-xl shadow-sm"
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
                className="absolute inset-0 p-2"
              >
                <motion.div
                  ref={scrollRef}
                  variants={scrollVariants}
                  animate={isHovered ? "pause" : "animate"}
                >
                  {data[newsTab].map((item, idx) => (
                    <div
                      key={idx}
                      className="py-2 border-b border-dotted border-gray-300 last:border-0"
                    >
                      <a
                        href={item.link}
                        className="text-gray-700 hover:text-blue-600 transition-colors block leading-tight"
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
            className="bg-[#2563eb] text-white px-6 py-3 mt-6 rounded-full font-semibold shadow hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <span>View All</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          <p className="text-gray-500 text-sm">{currentDate.toLocaleDateString()}</p>
        </div>

        {/* Right Section: Image & Blog */}
        <div className="space-y-4 lg:w-1/3">
          <img
            className="w-full h-96 object-cover rounded-xl shadow-md border border-gray-200"
            src={Image1}
            alt="cloud"
          />
          <div className="space-y-1 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Planned Upgrade to Cloud Servers
            </h2>
            <p className="text-gray-500 text-sm">{currentDate.toLocaleDateString()}</p>
            <p className="text-gray-600 text-sm">
              Our IT department is upgrading cloud infrastructure to ensure faster access and improved reliability for all departments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cloud;
