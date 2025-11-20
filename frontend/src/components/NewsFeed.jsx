import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "./Navbar";

// Sample data (can be replaced with props or API data)
const newsData = [
  {
    id: 1,
    instituteLogo: "https://via.placeholder.com/50",
    instituteName: "ABC University",
    title: "MBA Admissions Open 2025",
    description:
      "ABC University invites applications for the MBA program starting this fall. Hurry up and secure your place.",
    tags: ["MBA", "Admissions"],
    mediaType: "image",
    mediaSrc: "https://via.placeholder.com/200x120",
  },
  {
    id: 2,
    instituteLogo: "https://via.placeholder.com/50",
    instituteName: "XYZ Institute",
    title: "Scholarship Opportunities for STEM Students",
    description:
      "XYZ Institute offers exclusive scholarships for outstanding STEM students. Apply before the deadline.",
    tags: ["Scholarship", "STEM"],
    mediaType: "video",
    mediaSrc:
      "https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4",
  },
  {
    id: 3,
    instituteLogo: "https://via.placeholder.com/50",
    instituteName: "LMN College",
    title: "Upcoming Exams Notification - Fall 2025",
    description:
      "LMN College announces the schedule for fall 2025 exams. Get ready with your study plans.",
    tags: ["Exams", "Announcements"],
    mediaType: "pdf",
    mediaSrc: "/sample-exam-schedule.pdf",
  },
  {
    id: 4,
    instituteLogo: "https://via.placeholder.com/50",
    instituteName: "PQR University",
    title: "Exclusive Scholarships for Women in Technology",
    description:
      "PQR University is proud to offer special scholarships aimed at promoting women in technology fields.",
    tags: ["Scholarship", "Technology"],
    mediaType: "image",
    mediaSrc: "https://via.placeholder.com/200x120",
  },
  {
    id: 5,
    instituteLogo: "https://via.placeholder.com/50",
    instituteName: "ABC University",
    title: "Placement Drive Success Stories",
    description:
      "Read about recent placement drive success stories from ABC University alumni.",
    tags: ["Placements", "Events"],
    mediaType: "image",
    mediaSrc: "https://via.placeholder.com/200x120",
  },
  {
    id: 6,
    instituteLogo: "https://via.placeholder.com/50",
    instituteName: "XYZ Institute",
    title: "Webinar on Scholarship Application Tips",
    description:
      "Join our upcoming webinar to learn top tips for scholarship applications.",
    tags: ["Webinar", "Scholarship"],
    mediaType: "image",
    mediaSrc: "https://via.placeholder.com/200x120",
  },
  {
    id: 7,
    instituteLogo: "https://via.placeholder.com/50",
    instituteName: "LMN College",
    title: "Exclusive Insights: Exam Preparation Strategies",
    description:
      "LMN College experts share their best exam preparation strategies for top results.",
    tags: ["Exams", "Events"],
    mediaType: "image",
    mediaSrc: "https://via.placeholder.com/200x120",
  },
  {
    id: 8,
    instituteLogo: "https://via.placeholder.com/50",
    instituteName: "PQR University",
    title: "New Placements Announced for 2025 Batch",
    description:
      "PQR University announces new placement opportunities for the 2025 graduating batch.",
    tags: ["Placements", "Announcements"],
    mediaType: "image",
    mediaSrc: "https://via.placeholder.com/200x120",
  },
  {
    id: 9,
    instituteLogo: "https://via.placeholder.com/50",
    instituteName: "ABC University",
    title: "Annual Education Expo Coming Soon",
    description:
      "ABC University is hosting its Annual Education Expo with numerous participating institutes.",
    tags: ["Events"],
    mediaType: "image",
    mediaSrc: "https://via.placeholder.com/200x120",
  },
  {
    id: 10,
    instituteLogo: "https://via.placeholder.com/50",
    instituteName: "XYZ Institute",
    title: "Latest Updates on Admissions Process",
    description:
      "Get the latest updates and deadlines for the upcoming admissions cycle at XYZ Institute.",
    tags: ["Admissions"],
    mediaType: "image",
    mediaSrc: "https://via.placeholder.com/200x120",
  },
  // Additional posts for demo "Load More"
  {
    id: 11,
    instituteLogo: "https://via.placeholder.com/50",
    instituteName: "UVW College",
    title: "Scholarship of the Month Announcement",
    description:
      "UVW College announces the scholarship of the month for talented students.",
    tags: ["Scholarship"],
    mediaType: "image",
    mediaSrc: "https://via.placeholder.com/200x120",
  },
  {
    id: 12,
    instituteLogo: "https://via.placeholder.com/50",
    instituteName: "XYZ Institute",
    title: "Upcoming Webinar: How to Prepare for Competitive Exams",
    description:
      "Join industry experts in our upcoming webinar focused on exam preparation techniques.",
    tags: ["Webinar", "Exams"],
    mediaType: "image",
    mediaSrc: "https://via.placeholder.com/200x120",
  },
];

const categories = [
  "All",
  "Admissions",
  "Scholarships",
  "Exams",
  "Events",
  "Announcements",
];

const types = [
  "Scholarships",
  "Admissions",
  "Events",
  "Placements",
  "Announcements",
];

const dates = ["This week", "This month", "Last 3 months", "Custom"];

// Sample featured/sponsored universities
const featuredUniversities = [
  "ABC University",
  "XYZ Institute",
  "PQR University",
];

// Sample trending news (titles only)
const trendingNews = [
  "MBA Admissions Open Now",
  "Scholarship Deadline Approaching",
  "Upcoming Exam Dates Released",
  "Webinar: Scholarship Tips",
];
const webinars = [
  "Events:UPSC Exam,12-07-2025",
  "Events:GATE Exam,25-12-2025",
  "Events:CAT Exam,20-10-2025",
  "webinar:XYZ Institute,18-05-2025",
];

// Sample Scholarship of the Week
const scholarshipOfWeek = {
  title: "Women in Technology Scholarship",
  institute: "PQR University",
  deadline: "October 15, 2025",
};

// Upcoming Webinars/Exams dates for mini calendar
const upcomingEventsDates = [
  "2025-09-22",
  "2025-09-28",
  "2025-10-05",
  "2025-10-12",
];

const NewsFeed = () => {
  // State for filters
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [filterInstitutes, setFilterInstitutes] = useState([]);
  const [filterTypes, setFilterTypes] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [customDate, setCustomDate] = useState({ from: "", to: "" });

  // State for feed expansion
  const [visibleCount, setVisibleCount] = useState(5);

  // Sample list of institutes for filter (derived from newsData)


  // Handlers
  const toggleInstitute = (institute) => {
    setFilterInstitutes((prev) =>
      prev.includes(institute)
        ? prev.filter((i) => i !== institute)
        : [...prev, institute]
    );
  };

  const toggleType = (type) => {
    setFilterTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Filter news based on current selections
  const filteredNews = newsData
    .filter((item) =>
      category === "All" ? true : item.tags.includes(category)
    )
    .filter((item) =>
      filterInstitutes.length > 0
        ? filterInstitutes.includes(item.instituteName)
        : true
    )
    .filter((item) =>
      filterTypes.length > 0
        ? filterTypes.some((type) => item.tags.includes(type))
        : true
    )
    .filter((item) =>
      search
        ? item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.instituteName.toLowerCase().includes(search.toLowerCase())
        : true
    );

  // Sort news (mock sort, since no date/popularity data)
  const sortedNews =
    sortBy === "Latest"
      ? filteredNews // Assuming already sorted by latest
      : [...filteredNews].reverse(); // For demo "Most Popular" reverse order

  // Feed items for visible count
  const visibleNews = sortedNews.slice(0, visibleCount);

  // Load more handler
  const loadMore = () => {
    setVisibleCount((prev) =>
      prev + 5 > sortedNews.length ? sortedNews.length : prev + 5
    );
  };

  // Mini calendar for upcoming webinars/exams (simple version)
  // Highlight dates from upcomingEventsDates in September & October 2025
  const renderCalendar = () => {
    const daysInSep = 30;
    const daysInOct = 31;
    const combinedDays = [
      ...Array(daysInSep).fill().map((_, i) => ({ day: i + 1, month: "Sep" })),
      ...Array(daysInOct).fill().map((_, i) => ({ day: i + 1, month: "Oct" })),
    ];

    return (
      <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm">
        {["S", "M", "T", "W", "T", "F", "S"].map((wd) => (
          <div key={wd} className="font-semibold text-yellow-600">
            {wd}
          </div>
        ))}

        {/* Fill initial blank days for September 1 (Monday = 1, Sunday=0) */}
        {[...Array(1)].map((_, i) => (
          <div key={`blank-start-${i}`}></div>
        ))}

        {combinedDays.map(({ day, month }, idx) => {
          const dateStr = `2025-${month === "Sep" ? "09" : "10"}-${day < 10 ? "0" + day : day}`;
          const isEventDay = upcomingEventsDates.includes(dateStr);
          const isSep = month === "Sep";
          const isOct = month === "Oct";

          // We show only September and October dates with a different background if upcoming event
          if ((isSep || isOct) && day <= (isSep ? 30 : 31)) {
            return (
              <div
                key={`${month}-${day}`}
                className={`cursor-default rounded p-1 select-none transition text-xs sm:text-sm ${
                  isEventDay
                    ? "bg-gray-400 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                title={`${month} ${day}, ${isEventDay ? "Upcoming Event" : ""}`}
                aria-label={`${month} ${day} ${isEventDay ? "has upcoming event" : "no event"}`}
              >
                {day}
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-gray-100 text-gray-800 font-sans flex flex-col">
        {/* Quick Filter Bar */}
        <div className="ml-4 mr-4 flex flex-col sm:flex-row sm:items-center gap-4 px-4 sm:px-0">
          {/* Categories */}
          <div className="flex overflow-x-auto space-x-2 sm:space-x-4 pb-2 sm:pb-0 text-sm sm:text-base">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`transition-colors duration-300 px-3 py-1 rounded-md hover:bg-yellow-500 hover:text-white focus:outline-none whitespace-nowrap flex-shrink-0 ${
                  category === cat
                    ? "bg-gray-800 text-yellow-500 shadow"
                    : "bg-gray-800 text-yellow-500"
                }`}
                aria-label={`Filter category ${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <input
            type="search"
            placeholder="Search news, institutes, keywords"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow w-full sm:max-w-sm rounded-md px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            aria-label="Search news, institutes, keywords"
          />

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 transition text-sm sm:text-base"
            aria-label="Sort news"
          >
            <option className="text-gray-800 focus:gray-200">Latest</option>
            <option className="text-gray-800">Most Popular</option>
          </select>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto pt-6 px-4 gap-6 flex-1">
          {/* Left Sidebar Filters */}
          <aside className="w-full lg:w-72 order-1 lg:order-none sticky top-24 self-start bg-white rounded-lg p-4 sm:p-6 shadow-md space-y-6 sm:space-y-8 h-max">
            {/* Filter by Type */}
            <section aria-label="Filter by Type">
              <h2 className="text-lg font-semibold mb-3">Type</h2>
              <div className="space-y-2 text-sm sm:text-base">
                {types.map((type) => (
                  <label
                    key={type}
                    className="flex items-center cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      className="mr-2 accent-yellow-500"
                      checked={filterTypes.includes(type)}
                      onChange={() => toggleType(type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Filter by Date */}
            <section aria-label="Filter by Date">
              <h2 className="text-lg font-semibold mb-3">Date</h2>
              <div className="space-y-2 text-sm sm:text-base">
                {dates.map((d) => (
                  <label
                    key={d}
                    className="flex items-center cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      name="dateFilter"
                      className="mr-2 accent-yellow-500"
                      checked={filterDate === d}
                      onChange={() => setFilterDate(d)}
                    />
                    <span>{d}</span>
                  </label>
                ))}
              </div>
              {filterDate === "Custom" && (
                <div className="mt-3 space-y-1 text-sm sm:text-base">
                  <label>
                    From:{" "}
                    <input
                      type="date"
                      className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto"
                      value={customDate.from}
                      onChange={(e) =>
                        setCustomDate((prev) => ({ ...prev, from: e.target.value }))
                      }
                    />
                  </label>
                  <label>
                    To:{" "}
                    <input
                      type="date"
                      className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto"
                      value={customDate.to}
                      onChange={(e) =>
                        setCustomDate((prev) => ({ ...prev, to: e.target.value }))
                      }
                    />
                  </label>
                </div>
              )}
            </section>
          </aside>

          {/* Main Feed Area */}
          <main className="flex-1 w-full order-2 lg:order-none space-y-4 sm:space-y-6">
            {visibleNews.length === 0 && (
              <p className="text-center text-gray-500 text-sm sm:text-base">No news found.</p>
            )}

            {visibleNews.map((item) => (
              <article
                key={item.id}
                className="bg-gray-100 rounded-lg shadow-md p-4 sm:p-5 hover:shadow-lg transition-shadow duration-500 relative group w-full"
              >
                {/* Institute Logo and Name */}
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3">
                  <img
                    src={item.instituteLogo}
                    alt={`${item.instituteName} logo`}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-600 flex-shrink-0"
                  />
                  <h3 className="text-lg sm:text-xl font-semibold truncate">{item.instituteName}</h3>
                </div>

                {/* Post Title */}
                <h4 className="text-base sm:text-lg font-bold mb-1 text-left hover:text-gray-800 cursor-pointer transition-colors duration-300 line-clamp-2 sm:line-clamp-none">
                  {item.title}
                </h4>

                {/* Short Description */}
                <p className="text-gray-700 mb-3 line-clamp-3 text-left text-sm sm:text-base">
                  {item.description}
                  <button
                    className="ml-2 text-gray-800 hover:underline focus:outline-none"
                    aria-label={`Read more about ${item.title}`}
                  >
                    Read More
                  </button>
                </p>

                {/* Tags */}
                <div className="mb-3 flex flex-wrap gap-1 sm:space-x-2 text-left">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-800 text-yellow-500 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Media */}
                {item.mediaType === "image" && (
                  <img
                    src={item.mediaSrc}
                    alt={`Media for ${item.title}`}
                    className="w-full rounded-md mb-3 max-h-48 sm:max-h-60 object-cover"
                  />
                )}
                {item.mediaType === "video" && (
                  <video
                    controls
                    src={item.mediaSrc}
                    className="w-full rounded-md mb-3 max-h-48 sm:max-h-60"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
                {/* {item.mediaType === "pdf" && (
                  <a
                    href={item.mediaSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-600 hover:underline"
                  >
                    View PDF
                  </a>
                )} */}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-3">
                  <button className="bg-gray-800 text-white px-4 py-2 rounded-md shadow hover:bg-yellow-500 transition w-full sm:w-auto text-sm sm:text-base">
                    Apply Now
                  </button>
                  <button className="bg-gray-800 text-white px-4 py-2 rounded-md shadow hover:bg-yellow-500 transition w-full sm:w-auto text-sm sm:text-base">
                    Know More
                  </button>
                </div>

                {/* Engagement Options */}
                <div className="flex space-x-4 sm:space-x-6 text-gray-800 transition-colors duration-300 text-sm sm:text-base">
                  <button
                    aria-label="Like"
                    className="flex items-center space-x-1 focus:outline-none"
                  >
                    <i className="fa-solid fa-heart"></i>
                    <span>Like</span>
                  </button>
                  <button
                    aria-label="Share"
                    className="flex items-center space-x-1 transition focus:outline-none"
                  >
                    <i className="fa-solid fa-share-nodes"></i>
                    <span>Share</span>
                  </button>
                  <button
                    aria-label="Save"
                    className="flex items-center space-x-1"
                  >
                    <i className="fa-regular fa-bookmark"></i>
                    <span>Save</span>
                  </button>
                </div>
              </article>
            ))}

            {/* Load More Button */}
            {visibleCount < sortedNews.length && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={loadMore}
                  className="bg-gray-800 text-white px-6 py-3 rounded-md shadow hover:bg-yellow-600 transition focus:outline-none focus:ring-4 focus:ring-yellow-400 text-sm sm:text-base w-full sm:w-auto"
                >
                  Load More News & Updates
                </button>
              </div>
            )}
          </main>

          {/* Right Sidebar */}
          <aside className="w-full lg:w-72 order-3 lg:order-none sticky top-24 self-start bg-white rounded-lg p-4 sm:p-6 shadow-md space-y-6 sm:space-y-10 h-max">
            {/* Featured / Sponsored Universities */}
            <section aria-label="Featured or Sponsored Universities">
              <h2 className="text-lg font-semibold mb-4">Featured / Sponsored Universities</h2>
              <ul className="space-y-2 text-sm sm:text-base">
                {featuredUniversities.map((uni) => (
                  <li
                    key={uni}
                    className="p-2 bg-gray-400 text-gray-800 rounded-md font-medium select-none cursor-default"
                  >
                    {uni}
                  </li>
                ))}
              </ul>
            </section>

            {/* Trending News */}
            <section aria-label="Trending News">
              <h2 className="text-lg font-semibold mb-4">Trending News</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-left text-sm sm:text-base">
                {trendingNews.map((news, idx) => (
                  <li key={idx} className="hover:text-yellow-600 cursor-pointer transition">
                    {news}
                  </li>
                ))}
              </ul>
            </section>

            {/* Scholarship of the Week */}
            <section aria-label="Scholarship of the Week" className="bg-yellow-50 border border-yellow-300 rounded-md p-4 text-sm sm:text-base">
              <h2 className="text-lg font-semibold mb-2">
                Scholarship of the Week
              </h2>
              <p className="font-bold text-yellow-900">{scholarshipOfWeek.title}</p>
              <p>Institute: {scholarshipOfWeek.institute}</p>
              <p className="italic text-yellow-700">Deadline: {scholarshipOfWeek.deadline}</p>
            </section>

            {/* Upcoming Webinars/Exams Mini Calendar */}
            <section aria-label="Upcoming Webinars/Exams">
              <h2 className="text-lg font-semibold mb-4">Upcoming Webinars/Exams</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-left text-sm sm:text-base">
                {webinars.map((news, idx) => (
                  <li key={idx} className="hover:text-yellow-600 cursor-pointer transition">
                    {news}
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsFeed;