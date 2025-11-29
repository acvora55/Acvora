import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, BookOpen, Users, ExternalLink, Award } from "lucide-react"; // Assuming Lucide React for icons; install if needed: npm i lucide-react
import Navbar from "../components/Navbar";

const MySavedExams = () => {
  const [savedExams, setSavedExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(`https://acvora-07fo.onrender.com/api/savedExams/${userId}`)
      .then((res) => {
        setSavedExams(res.data);
      })
      .catch((err) => {
        console.error("Error fetching saved exams:", err);
        setError("Failed to load saved exams. Please try again.");
        // Fallback to localStorage if needed
        const saved = localStorage.getItem("savedExams");
        if (saved) {
          setSavedExams(JSON.parse(saved));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  const handleUnsave = async (examId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      await axios.delete(`https://acvora-07fo.onrender.com/api/savedExams/${userId}/${examId}`);
      setSavedExams(savedExams.filter((exam) => exam.examId !== examId));
    } catch (err) {
      console.error("Error unsaving exam:", err);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-6 py-8">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading your saved exams...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center px-6 py-8">
          <div className="text-center max-w-md">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!savedExams.length) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-6 py-8">
          <div className="text-center max-w-md">
            <Award className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Saved Exams Yet</h2>
            <p className="text-gray-600 mb-6">
              Start exploring our exams and save the ones that interest you to access them here anytime.
            </p>
            <a
              href="/exams"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Explore Exams
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Award className="h-8 w-8 text-blue-600 mr-3" />
              My Saved Exams ({savedExams.length})
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedExams.map((exam) => (
              <div
                key={exam.examId}
                className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative"
              >
                <button
                  onClick={() => handleUnsave(exam.examId)}
                  className="absolute top-4 right-4 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  title="Unsave Exam"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="p-6" onClick={() => navigate(`/exampage/${exam.examId}`)}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Saved
                    </div>
                  </div>
                  <h2 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {exam.examName}
                  </h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">Conducting Body: {exam.conductingBody}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Award className="h-4 w-4 mr-2" />
                    <span className="text-sm">Next Event: {exam.nextEvent}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Quick Access</span>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MySavedExams;