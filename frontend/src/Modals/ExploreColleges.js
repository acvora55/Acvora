import React, { useState } from "react";
import illustration from "../Images/illustration-1.webp";

const ExploreColleges = ({ closeModal }) => {
  const [records, setRecords] = useState([]);
  const [userRegistration, setUserRegistration] = useState({
    location: "",
    State: "",
    City: "",
    Stream: "",
    Courses: "",
    Diploma: "",
  });

  // Sample data for locations
  const locations = ["India", "USA"];

  // List of Indian states
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  // Sample city mapping for some Indian states
  const cityMapping = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun"],
    "Assam": ["Guwahati", "Dibrugarh", "Silchar"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
    "Goa": ["Panaji", "Margao"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
    "Haryana": ["Gurugram", "Faridabad", "Chandigarh"],
    "Himachal Pradesh": ["Shimla", "Dharamshala"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
    "Karnataka": ["Bengaluru", "Mysuru", "Hubli"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Manipur": ["Imphal"],
    "Meghalaya": ["Shillong"],
    "Mizoram": ["Aizawl"],
    "Nagaland": ["Kohima", "Dimapur"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"],
    "Sikkim": ["Gangtok"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Telangana": ["Hyderabad", "Warangal"],
    "Tripura": ["Agartala"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
    "Uttarakhand": ["Dehradun", "Haridwar"],
    "West Bengal": ["Kolkata", "Siliguri", "Durgapur"],
  };

  // Course recommendations based on stream
  const courseRecommendations = {
    Engineering: ["Computer Science", "Mechanical", "Civil", "Electrical", "Electronics"],
    Management: ["Business Administration", "Marketing", "Finance", "Human Resources"],
    Art: ["Fine Arts", "Graphic Design", "Performing Arts", "Visual Arts"],
    Commerce: ["Accounting", "Economics", "Business Studies", "Finance"],
    Science: ["Physics", "Chemistry", "Biology", "Mathematics"],
    Medical: ["MBBS", "Nursing", "Pharmacy", "Dentistry"],
    "Non-Medical": ["Physics", "Chemistry", "Mathematics", "Computer Science"],
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserRegistration((prev) => {
      const updated = { ...prev, [name]: value };
      // Reset Courses when Stream changes
      if (name === "Stream") {
        return { ...updated, Courses: "" };
      }
      // Reset City when State changes
      if (name === "State") {
        return { ...updated, City: "" };
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      ...userRegistration,
      id: new Date().getTime().toString(),
    };
    setRecords([...records, newRecord]);
    setUserRegistration({
      location: "",
      State: "",
      City: "",
      Stream: "",
      Courses: "",
      Diploma: "",
    });
  };

  // Get course recommendations based on selected stream
  const recommendedCourses = userRegistration.Stream
    ? courseRecommendations[userRegistration.Stream] || []
    : [];

  // Get cities based on selected state
  const availableCities = userRegistration.State
    ? cityMapping[userRegistration.State] || []
    : [];

  return (
    <section className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-black/70 z-50 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-auto max-w-[70vw] overflow-hidden flex flex-col md:flex-row items-center justify-center relative">
        {/* Content */}
        <div className="flex flex-col md:flex-row items-center justify-center px-8 pb-8 gap-8">
          {/* Form */}
          <div className="flex flex-col justify-center items-center min-w-[280px] max-w-[400px]">
            <h2 className="text-2xl font-bold text-gray-800 mt-5 mb-6 font-serif text-center">
              Explore Universities
            </h2>

            <form className="space-y-4 w-full max-w-[350px]" onSubmit={handleSubmit}>
              <select
                name="location"
                value={userRegistration.location}
                onChange={handleInput}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>

              {userRegistration.location === "India" && (
                <>
                  <select
                    name="State"
                    value={userRegistration.State}
                    onChange={handleInput}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">State</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>

                  <select
                    name="City"
                    value={userRegistration.City}
                    onChange={handleInput}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!userRegistration.State}
                  >
                    <option value="">City</option>
                    {availableCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {userRegistration.location !== "India" && (
                <>
                  <input
                    name="State"
                    value={userRegistration.State}
                    onChange={handleInput}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="State"
                    autoComplete="off"
                  />

                  <input
                    name="City"
                    value={userRegistration.City}
                    onChange={handleInput}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="City"
                    autoComplete="off"
                  />
                </>
              )}

              <select
                name="Stream"
                value={userRegistration.Stream}
                onChange={handleInput}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Stream</option>
                <option value="Engineering">Engineering</option>
                <option value="Management">Management</option>
                <option value="Art">Art</option>
                <option value="Commerce">Commerce</option>
                <option value="Science">Science</option>
                <option value="Medical">Medical</option>
                <option value="Non-Medical">Non-Medical</option>
              </select>

              <select
                name="Diploma"
                value={userRegistration.Diploma}
                onChange={handleInput}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Diploma</option>
                <option value="PHD">PHD</option>
                <option value="Masters">Masters</option>
                <option value="PG">PG</option>
                <option value="UG">UG</option>
              </select>

              <input
                name="Courses"
                value={userRegistration.Courses}
                onChange={handleInput}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder={
                  recommendedCourses.length > 0
                    ? `Suggested: ${recommendedCourses.join(", ")}`
                    : "Courses"
                }
                autoComplete="off"
              />

              <button
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Illustration with close button */}
          <div className="relative flex items-center justify-center">
            {/* Close Button on top-right of image */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black font-bold text-xl z-10"
              onClick={() => closeModal(false)}
            >
              ✕
            </button>

            <img
              src={illustration}
              alt="Explore Illustration"
              className="w-72 md:w-80 lg:w-96 rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreColleges;