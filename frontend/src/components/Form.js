import React, { useState } from "react";
import Axios from "axios";
import SelectCountry from "./SelectCountry";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    state: "",
    zip: "",
    country: "",
    qualification: "",
    stream: "",
    course: "",
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const sendData = (e) => {
    e.preventDefault();
    Axios.post("https://acvora-1.onrender.com/get-more-college-options", formData)
      .then(() => {
        showToast("Form submitted successfully!", "success");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          address: "",
          state: "",
          zip: "",
          country: "",
          qualification: "",
          stream: "",
          course: "",
        });
      })
      .catch(() => {
        showToast("Something went wrong. Please try again.", "error");
      });
  };

  return (
    <section className="flex justify-center items-center py-10 bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-4xl w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
          Secure Your Future – Get More College Options
        </h2>

        <form
          onSubmit={sendData}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Name */}
          <div className="flex flex-col space-y-0">
            <label className="text-lg font-medium text-gray-900">Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your full name"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-0">
            <label className="text-lg font-medium text-gray-900">Email *</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="abc123@gmail.com"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Mobile */}
          <div className="flex flex-col space-y-0">
            <label className="text-lg font-medium text-gray-900">
              Contact No. *
            </label>
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              type="tel"
              placeholder="9876543210"
              pattern="[0-9]{10}"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col space-y-0">
            <label className="text-lg font-medium text-gray-900">Address *</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              type="text"
              placeholder="Enter your address"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* State */}
          <div className="flex flex-col space-y-0">
            <label className="text-lg font-medium text-gray-900">State *</label>
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              type="text"
              placeholder="Enter your state"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* ZIP */}
          <div className="flex flex-col space-y-0">
            <label className="text-lg font-medium text-gray-900">ZIP *</label>
            <input
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              type="text"
              placeholder="123456"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Country */}
          <div className="flex flex-col space-y-0">
            <label className="text-lg font-medium text-gray-900">Country *</label>
            <SelectCountry
              value={formData.country}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, country: e.target.value }))
              }
            />
          </div>

          {/* Qualification */}
          <div className="flex flex-col space-y-0">
            <label className="text-lg font-medium text-gray-900">
              Qualification *
            </label>
            <select
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">Select Qualification</option>
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          {/* Stream */}
          <div className="flex flex-col space-y-0">
            <label className="text-lg font-medium text-gray-900">Stream *</label>
            <select
              name="stream"
              value={formData.stream}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">Select Stream</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Course */}
          <div className="flex flex-col space-y-0">
            <label className="text-lg font-medium text-gray-900">
              Course Preference *
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">Select Course</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="MBA">MBA</option>
              <option value="MBBS">MBBS</option>
              <option value="BBA">BBA</option>
              <option value="BCA">BCA</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-gray-800 hover:bg-yellow-600 text-white font-semibold rounded-lg py-3 transition duration-300"
            >
              Submit & Get Options
            </button>
          </div>
        </form>

        {/* Toast */}
        {toast.show && (
          <div
            className={`fixed bottom-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white text-sm ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            } transition-all`}
          >
            {toast.message}
          </div>
        )}
      </div>
    </section>
  );
};

export default Form;
