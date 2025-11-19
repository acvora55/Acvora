import React from "react";
import { BiSearch } from "react-icons/bi";

const Newsletter = () => {
  return (
    <section className="mx-auto">
      <div className="bg-gray-900  shadow-lg py-10 px-6 flex flex-col gap-6 items-center">
        
        {/* Header + Search Bar */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-3xl font-bold text-white text-center md:text-left">
            Trending Exams
          </h2>

          {/* Search Bar */}
          <div className="relative w-full md:w-1/2">
            <input
              type="search"
              placeholder="Search for upcoming exams, educational news..."
              className="w-full bg-white/10 border border-white/30 text-white placeholder:text-gray-200 rounded-full px-12 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
            />
            <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-xl" />
          </div>
        </div>

        {/* Marquee Section */}
        <div className="w-full max-w-4xl bg-white/10 rounded-xl p-3">
          <marquee
            className="text-lg font-semibold text-yellow-100 tracking-wide"
            behavior="scroll"
            direction="left"
          >
            Government announces JEE exam date on 8th of September | NEET 2025
            registration opens next week | CBSE Class 12 results expected soon
          </marquee>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
