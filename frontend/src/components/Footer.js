import React from "react";
import {
  BsInstagram,
  BsFacebook,
  BsTwitter,
  BsPinterest,
  BsLinkedin,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const sectionClasses = "p-6 space-y-2";
  const headingClasses = "text-lg font-semibold text-white mb-3";

  return (
    <footer className="bg-gray-900 opacity-90 text-gray-300 pt-16 px-9 md:px-15">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-7 max-w-7xl mx-auto">
        {/* Top Exam */}
        <div className={sectionClasses}>
          <h1 className={headingClasses}><span className="text-yellow-500" >Top Exams </span></h1>
          <ul className="space-y-1">
            <li onClick={() => navigate("/college-review")} className="hover:text-yellow-500 hover:underline  cursor-pointer">College Review</li>
            <li onClick={() => navigate("/universityDetails")} className="hover:text-yellow-500 hover:underline cursor-pointer">Top Colleges in India</li>
            <li onClick={() => navigate("/explorecollegespage")} className="hover:text-yellow-500 hover:underline  cursor-pointer">Top Engineering Colleges</li>
            <li onClick={() => navigate("/explorecollegespage")} className="hover:text-yellow-500 hover:underline  cursor-pointer">Top Law Colleges</li>
            <li onClick={() => navigate("/service")} className="hover:text-yellow-500 hover:underline cursor-pointer">Services</li>
            <li onClick={() => navigate("/lpu")} className="hover:text-yellow-500 hover:underline  cursor-pointer">LPU</li>
            <li onClick={() => navigate("/upe")} className="hover:text-yellow-500 hover:underline  cursor-pointer">UPE</li>
            <li onClick={() => navigate("/greatlake")} className="hover:text-yellow-500 hover:underline  cursor-pointer">Great Lake</li>
            <li onClick={() => navigate("/mahe")} className="hover:text-yellow-500 hover:underline  cursor-pointer">MAHE (Manipal)</li>
            <li onClick={() => navigate("/srm")} className="hover:text-yellow-500 hover:underline  cursor-pointer">SRM University</li>
          </ul>
        </div>

        {/* Top Courses */}
        <div className={sectionClasses}>
          <h1 className={headingClasses}> <span className="text-yellow-500"> Top Courses</span> </h1>
          <ul className="space-y-1">
          <li onClick={() => navigate("/mtech")} className="hover:text-yellow-500 hover:underline  cursor-pointer">M.Tech</li>
            <li onClick={() => navigate("/btech")} className="hover:text-yellow-500 hover:underline cursor-pointer">B.Tech</li>
            <li onClick={() => navigate("/B.tech - CSE")} className="hover:text-yellow-500 hover:underline  cursor-pointer">B.Tech - CSE</li>
            <li onClick={() => navigate("/B.Tech - ME")} className="hover:text-yellow-500 hover:underline  cursor-pointer">B.Tech - ME</li>
            <li onClick={() => navigate("/B.Tech - ECE")} className="hover:text-yellow-500 hover:underline cursor-pointer">B.Tech - ECE</li>
            <li onClick={() => navigate("/B.Tech - Civil")} className="hover:text-yellow-500 hover:underline  cursor-pointer">B.Tech - Civil</li>
            <li onClick={() => navigate("/MBA")} className="hover:text-yellow-500 hover:underline  cursor-pointer">MBA</li>
            <li onClick={() => navigate("/bba")} className="hover:text-yellow-500 hover:underline  cursor-pointer">BBA</li>
            <li onClick={() => navigate("/BAMS")} className="hover:text-yellow-500 hover:underline  cursor-pointer">BAMS</li>
          </ul>
        </div>

        {/* Predictors */}
        <div className={sectionClasses}>
          <h1 className={headingClasses}> <span className="text-yellow-500"> Predictors & Ebooks </span></h1>
          <ul className="space-y-1">
            {["JEE Main 2023","NEET 2023","GATE 2023","CAT 2022","CMAT 2023","CLAT 2023","IIT JAM 2023","LPUNEST 2023","MET 2023","KCET 2023","SET 2023"].map((exam, i) => (
              <li key={i}><Link to="/" className="hover:text-yellow-500 hover:underline ">{exam}</Link></li>
            ))}
          </ul>
        </div>

        {/* College Tools */}
        <div className={sectionClasses}>
          <h1 className={headingClasses}> <span className="text-yellow-500"> College Tools </span></h1>
          <ul className="space-y-1">
            {["JEE Main College Predictor","JEE Main Rank Predictor","JEE Advanced Predictor","NEET College Predictor","CAT College Predictor","CLAT College Predictor","CAT Percentile Predictor","E-books & Sample Papers","NEET Rank Predictor","General College Predictor"].map((tool, i) => (
              <li key={i}><Link to="/" className="hover:text-yellow-500 hover:underline ">{tool}</Link></li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className={sectionClasses}>
          <h1 className={headingClasses}> <span className="text-yellow-500"> Resources </span></h1>
          <ul className="space-y-1">
            {["B.Tech Companion","MBBS Companion","NCERT","Courses","Digital Marketing Courses","Counselling Webinars","BITSAT 2023 Cutoff","Education","B.Tech","Full Forms","MBBS"].map((res, i) => (
              <li key={i}><Link to="/" className="hover:text-yellow-500 hover:underline ">{res}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-yellow-700 mt-12 pt-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <h1 className="text-xl font-bold text-yellow-500 tracking-wide">FindMyCollege</h1>

        {/* Links */}
        <ul className="flex space-x-6 text-gray-300 font-medium">
          <li><Link to="/" className="hover:text-yellow-500 hover:underline ">Home</Link></li>
          <li><Link to="/privacy" className="hover:text-yellow-500 hover:underline ">Privacy</Link></li>
          <li><Link to="/contactus" className="hover:text-yellow-500 hover:underline ">Contact</Link></li>
          <li><Link to="/about" className="hover:text-yellow-500 hover:underline ">About</Link></li>
        </ul>

        {/* Social Icons */}
        <div className="flex space-x-5 text-gray-300">
  <a href="https://www.instagram.com/acvora?utm_source=qr&igsh=MTNvbGNsMTdlZWNtdg==" target="_blank" rel="noopener noreferrer">
    <BsInstagram size={20} className="cursor-pointer hover:text-yellow-500 transition" />
  </a>
  <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
    <BsFacebook size={20} className="cursor-pointer hover:text-yellow-500 transition" />
  </a>
  <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer">
    <BsTwitter size={20} className="cursor-pointer hover:text-yellow-500 transition" />
  </a>
  <a href="https://www.linkedin.com/company/headwayvision/" target="_blank" rel="noopener noreferrer">
    <BsLinkedin size={20} className="cursor-pointer hover:text-yellow-500 transition" />
  </a>
</div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-8 pb-4">
        © {new Date().getFullYear()} FindMyCollege Pvt. Ltd. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
