import React, { useEffect, useRef, useState } from "react";
import Image1 from "../Images/LPU.webp";
import Image2 from "../Images/chandigarh-university.png";
import Image3 from "../Images/g-Uni.jpg";
import { BiSearch } from "react-icons/bi";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const IMAGES = [Image1, Image2, Image3];
const ROTATE_MS = 8000;

export default function Header() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  // 🔍 Search State
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, ROTATE_MS);
    return () => clearInterval(timerRef.current);
  }, []);

  // Fetch search suggestions dynamically
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=${query}`
        );
        const [, titles] = response.data;
        setSuggestions(titles.slice(0, 5));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        "_blank"
      );
    }
  };

  return (
    <header className="relative w-full min-h-[640px] h-[92vh] bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={IMAGES[index]}
          alt="Campus"
          className="w-full h-full object-cover opacity-90 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-teal-900/40 to-black/70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Content container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 pt-32">
        <div className="mt-0 sm:mt-2 md:mt-4 lg:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Text + CTAs */}
          <div className="max-w-2xl">
            <p className="text-teal-300 font-semibold tracking-wide uppercase text-sm sm:text-[13px]">
              {/* Optional tagline */}
            </p>
            <h1 className="mt-2 sm:mt-3 text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight">
              Find the perfect college
              <span className="text-yellow-500">
                {" "}
                with a smarter, simpler search
              </span>
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-white">
              Discover programs, compare campuses, and get personalized guidance
              to reach academic goals—powered by trusted information and expert
              support.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col xs:flex-row sm:flex-row gap-3 sm:gap-4 animate-float">
              <button
                type="button"
                onClick={() => navigate("/contactus")}
                className="inline-flex items-center justify-center h-11 sm:h-12 px-5 sm:px-6 rounded-lg
                           bg-yellow-500 hover:bg-gray-700 active:bg-gray-600
                           text-black font-semibold shadow-[0_6px_20px_-5px_rgba(20,184,166,0.6)]
                           transition-colors"
              >
                Schedule a Consultation →
              </button>

              <a
                href="explorecollegespage"
                className="inline-flex items-center justify-center h-11 sm:h-12 px-5 sm:px-6 rounded-lg
                           border border-yellow-400/70 text-yellow-500 hover:bg-gray-300
                           transition-colors"
              >
                Explore Colleges
              </a>
            </div>
          </div>

          {/* Search card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-7 border border-white/15 shadow-xl animate-float mt-28 relative">
            <label htmlFor="site-search" className="sr-only">
              Search colleges, courses, exams, articles, news
            </label>
            <div className="flex items-stretch">
              <input
                id="site-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search colleges, courses, exams, articles, news"
                className="flex-1 h-11 sm:h-12 px-3 sm:px-4 rounded-l-xl bg-white text-gray-900 placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="h-11 sm:h-12 w-12 sm:w-14 flex items-center justify-center rounded-r-xl
                           bg-yellow-500 hover:bg-yellow-400 active:bg-gray-600 text-white
                           focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Search"
              >
                <BiSearch className="text-xl sm:text-2xl" />
              </button>
            </div>

            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setQuery(item);
                      handleSearch();
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-white">
              Popular: B.Tech, MBA, CUET, Scholarships, Hostel
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-12 bg-gradient-to-t from-black/40 to-transparent" />
    </header>
  );
}