import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Award, GraduationCap, Users, Bookmark, ExternalLink } from "lucide-react"; // Updated import: Bookmark instead of Heart
import Navbar from "../components/Navbar";

export default function SavedScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Quick fix: Get user from individual localStorage keys
  const user = {
    userId: localStorage.getItem("userId"),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
  };

  useEffect(() => {
    const fetchSavedScholarships = async () => {
      if (!user?.userId) {
        setError("Please log in to view saved scholarships.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://acvora-1.onrender.com/api/savedScholarships/${user.userId}`);
        if (!res.ok) throw new Error("Failed to fetch saved scholarships");
        const { savedScholarships } = await res.json();
        setScholarships(savedScholarships);
      } catch (err) {
        console.error(err);
        setError("Failed to load saved scholarships. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedScholarships();
  }, [user?.userId]);

  const toggleSave = async (scholarshipId) => {
    if (!user?.userId) {
      alert("Please log in to save scholarships.");
      return;
    }

    try {
      const method = scholarships.some(s => s._id === scholarshipId) ? "DELETE" : "POST";
      const res = await fetch(
        `https://acvora-1.onrender.com/api/savedScholarships/${user.userId}/${scholarshipId}`,
        { method }
      );
      if (!res.ok) throw new Error("Failed to update saved scholarships");

      const { savedScholarships } = await res.json();
      // Update local state: remove if unsaving
      setScholarships(prev => 
        prev.filter(s => s._id !== scholarshipId)
      );
    } catch (err) {
      console.error(err);
      alert("Error updating saved scholarships.");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 md:px-20 py-6">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading your saved scholarships...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center px-4 md:px-20 py-6">
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

  const savedList = scholarships; // Already filtered by user

  if (savedList.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4 md:px-20 py-6">
          <div className="text-center max-w-md">
            <Award className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Saved Scholarships Yet</h2>
            <p className="text-gray-600 mb-6">
              Start exploring our scholarships and save the ones that interest you to access them here anytime.
            </p>
            <a
              href="/scholarship"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Browse Scholarships
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 md:px-20 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Award className="h-8 w-8 text-blue-600 mr-3" />
              Saved Scholarships ({savedList.length})
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedList.map((sch) => (
              <div
                key={sch._id}
                className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Saved
                    </div>
                    <button
                      className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(sch._id);
                      }}
                    >
                      <Bookmark className="h-5 w-5" fill="currentColor" />
                    </button>
                  </div>
                  <h2 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {sch.name}
                  </h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <span className="text-sm">{sch.universityId?.instituteName || "Unknown University"}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {sch.provider ? `Provider: ${sch.provider}` : "No provider listed"}
                    </span>
                  </div>
                  <button
                    className="w-full flex items-center justify-center mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/scholarship/${sch._id}`);
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}