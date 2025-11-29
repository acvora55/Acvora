// src/App.jsx
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import RedirectToProfile from "./components/RedirectToProfile"; // ✅ New import
import Counselling from './components/Counselling';
import Exams from './components/Exams';
import NewsFeed from "./components/NewsFeed";
import Examat from "./Pages/ExamAt";

// Pages
import PasswordReset from "./Pages/PasswordReset";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import ExploreCollegesPage from "./Pages/ExploreCollegesPage";
import Scholarship from "./Pages/Scholarship";
import ExploreCoursePage from "./Pages/ExploreCoursesPage";
import MySavedCourses from "./Pages/MySavedCourses"; // ✅ New import
import Companion from "./FooterPages/Companion";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminHome from "./Pages/Admin/AdminHome";
import LoginModal from "./Modals/LoginModal";
import SignupModal from "./Modals/SignupModal";
import UniversityDetails from "./Pages/UniversityDetails";
import CourseRegister from "./Pages/CourseRegister";
import MyProfile from "./Pages/MyProfile";
import CoursePage from "./Pages/CoursePage";
import SavedScholarships from "./Pages/SavedScholarships";

// Footer Pages
import CollegeReview from './FooterPages/topExam/CollegeReview';
import GreatLakes from './FooterPages/topExam/GreatLakes';
import LPU from './FooterPages/topExam/LPU';
import Mahe from './FooterPages/topExam/Mahe';
import Service from './FooterPages/topExam/Service';
import Srm from './FooterPages/topExam/Srm';
import Upes from './FooterPages/topExam/Upes';
import Privacy from "./FooterPages/Privacy";
import ContactUs from "./FooterPages/ContactUs";
import Abtnv from "./FooterPages/Abtnv";

// University & Dashboard
import AgentDashboard from "./AgentDashboard/Agent";
import UniversityDashboard from "./dashboard/UniversityDashboard";
import UniversityPage from "./Pages/UniversityPage";
import UniversityRegister from "./Pages/UniversityRegister";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />

      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
        <Route path="/explorecollegespage" element={<ExploreCollegesPage />} />
        <Route path="/universityDetails" element={<UniversityDetails />} />
        <Route path="/scholarship" element={<Scholarship />} />
        <Route path="/courses" element={<ExploreCoursePage />} />
        <Route path="/companion" element={<Companion />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/college-profile" element={<AdminHome />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/signup" element={<SignupModal />} />
        <Route path="/counselling" element={<Counselling />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/examat" element={<Examat />} />
        <Route path="/newsfeed" element={<NewsFeed />} /> {/* ✅ Fixed path to match Navbar: /newsfeed (lowercase) */}

        {/* ✅ New Profile Redirect Route to match Navbar (assumed /profile link) */}
        <Route path="/profile" element={<RedirectToProfile />} />

        {/* ✅ Updated My Profile Routes to match Navbar */}
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/myprofile/:id" element={<MyProfile />} />

        {/* ✅ New My Courses Route - Updated to match Navbar /course */}
        <Route path="/course" element={<MySavedCourses />} /> {/* ✅ Changed from /my-courses to /course to match Navbar */}

        <Route path="/saved-scholarships" element={<SavedScholarships />} />

        {/* University & Dashboard Routes */}
        <Route path="/university-dashboard/:id" element={<UniversityDashboard />} />
        <Route path="/university-dashboard" element={<UniversityDashboard />} />
        <Route path="/university-page/:id" element={<UniversityPage />} />
        <Route path="/university-register" element={<UniversityRegister />} />
        <Route path="/agent-dashboard" element={<AgentDashboard />} />
        <Route path="/university-profile/:id" element={<UniversityPage />} />

        {/* Footer Page Routes */}
        <Route path="/college-review" element={<CollegeReview />} />
        <Route path="/service" element={<Service />} />
        <Route path="/lpu" element={<LPU />} />
        <Route path="/upes" element={<Upes />} />
        <Route path="/greatlake" element={<GreatLakes />} />
        <Route path="/mahe" element={<Mahe />} />
        <Route path="/srm" element={<Srm />} />
        <Route path="/coursepage/:id" element={<CoursePage />} />
        <Route path="/courseregister" element={<CourseRegister />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/about" element={<Abtnv />} />

        {/* ✅ TODO: Add missing routes for Navbar dropdown if needed */}
        {/* <Route path="/study-material" element={<StudyMaterial />} /> */}
        {/* <Route path="/exam" element={<Exams />} /> - Already exists as /exams, consider alias or update Navbar */}
        {/* <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;