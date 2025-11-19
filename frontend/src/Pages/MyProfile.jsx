import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader2, Calendar, Video, Clock, CheckCircle, XCircle } from "lucide-react"; // Added icons for counselling section
import Navbar from "../components/Navbar";

const MyProfile = () => {
  const { id: paramId } = useParams(); // Get the user ID from the URL
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    university: "",
    course: "",
    branch: "",
    academicDetails: "",
  });
  const [counsellingData, setCounsellingData] = useState([]); // ✅ Add state for counselling bookings
  const [loading, setLoading] = useState(true);

  // Use paramId first, else fallback to logged-in userId from localStorage
  const userId = paramId || localStorage.getItem("userId");

  const universities = [
    "Delhi University",
    "Jawaharlal Nehru University", 
    "IIT Bombay",
    "IIT Delhi",
    "IIM Ahmedabad",
    "Anna University",
    "Amity University",
  ];

  const courses = ["B.Tech", "MBA", "B.Sc", "BBA", "M.Tech", "MCA", "Ph.D"];
  const branches = [
    "Computer Science",
    "Electronics", 
    "Mechanical Engineering",
    "Civil Engineering",
    "Marketing",
    "Finance",
    "Human Resources",
  ];

  // Fetch profile and counselling data
  useEffect(() => {
    const fetchProfileAndCounselling = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch profile
        const profileRes = await axios.get(`https://acvora-07fo.onrender.com/api/profile/${userId}`);
        setFormData(profileRes.data);

        // Fetch counselling bookings
        const counsellingRes = await axios.get(`https://acvora-07fo.onrender.com/api/counselling/${userId}`);
        setCounsellingData(counsellingRes.data.data); // array of counselling bookings

        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile or counselling data:", error);
        setLoading(false);
      }
    };

    fetchProfileAndCounselling();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://acvora-07fo.onrender.com/api/profile/${userId}`, formData);
      setEditMode(false);
      alert("Profile updated successfully ✅");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile ❌");
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  // Status badge component for counselling
  const StatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
      switch (status?.toLowerCase()) {
        case "confirmed":
          return { bg: "bg-green-500/20", text: "text-green-400", icon: CheckCircle };
        case "cancelled":
          return { bg: "bg-red-500/20", text: "text-red-400", icon: XCircle };
        default:
          return { bg: "bg-yellow-500/20", text: "text-yellow-400", icon: Clock };
      }
    };

    const config = getStatusConfig(status);
    const Icon = config.icon;

    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} border border-white/10`}>
        <Icon className="h-3 w-3 mr-1" />
        {status || "Pending"}
      </div>
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#1f2230] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-purple-500 mx-auto mb-4" />
            <p className="text-white">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#1f2230] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Basic Profile Card */}
          <div className="bg-[#2b2f3a] border border-white/10 text-white rounded-xl shadow-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  {formData.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{formData.name}</h2>
                  <p className="text-gray-400">{formData.email}</p>
                </div>
              </div>

              {/* Edit/Save Buttons */}
              <div className="flex items-center space-x-3">
                {!editMode ? (
                  <button 
                    onClick={() => setEditMode(true)}
                    className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md text-white font-semibold transition-colors"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white font-semibold transition-colors mr-2"
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md text-white font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Profile Fields */}
            {!editMode ? (
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Full Name</label>
                  <p className="text-white font-medium">{formData.name}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Email Address</label>
                  <p className="text-white font-medium">{formData.email}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Phone Number</label>
                  <p className="text-white font-medium">{formData.phone}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Pincode</label>
                  <p className="text-white font-medium">{formData.pincode}</p>
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-sm font-medium text-gray-400">Address</label>
                  <p className="text-white font-medium">{formData.address}</p>
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Form Inputs for editMode */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-[#1f2230] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-[#1f2230] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-[#1f2230] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    maxLength={6}
                    className="w-full p-3 rounded-md bg-[#1f2230] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-white">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-[#1f2230] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ✅ Counselling Booking Status - Enhanced UI */}
          <div className="bg-[#2b2f3a] border border-white/10 text-white rounded-xl shadow-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-purple-400" />
              Counselling Bookings
            </h3>
            {counsellingData.length === 0 ? (
              <div className="text-center py-8">
                <Video className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No counselling bookings found.</p>
                <p className="text-gray-500 mt-2">Book a session to get started with your career guidance.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {counsellingData.map((c) => (
                  <div key={c._id} className="group bg-[#1f2230] border border-gray-600 rounded-lg p-4 hover:border-purple-500 transition-colors overflow-hidden">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="font-semibold text-white text-sm">Booking #{counsellingData.indexOf(c) + 1}</span>
                      </div>
                      <StatusBadge status={c.status} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Video className="h-4 w-4 text-purple-400 flex-shrink-0" />
                          <span className="text-gray-300 font-medium">Type:</span>
                          <span className="text-white">{c.counselingType}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Video className="h-4 w-4 text-purple-400 flex-shrink-0" />
                          <span className="text-gray-300 font-medium">Session Mode:</span>
                          <span className="text-white">{c.sessionMode}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-purple-400 flex-shrink-0" />
                          <span className="text-gray-300 font-medium">Date:</span>
                          <span className="text-white">{c.sessionDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="h-4 w-4 text-purple-400 flex-shrink-0" />
                          <span className="text-gray-300 font-medium">Time Slot:</span>
                          <span className="text-white">{c.timeSlot}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;