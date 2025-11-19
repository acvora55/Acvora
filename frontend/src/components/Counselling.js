  import React, { useState } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
  import Navbar from "./Navbar";
  import axios from "axios";
  import Footer from "../components/Footer";

  // -------------------
  // Hero Section
  // -------------------
  function HeroSection() {
  const handleScrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
    return (
      <section className="text-center py-5 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Get Expert Counseling for Your Future
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-900 mb-6"
        >
          First session at just{" "}
          <span className="font-semibold text-yellow-400">₹49</span> – affordable,
          personalized, and trusted.
        </motion.p>
        <motion.button
          onClick={handleScrollToBooking}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-gray-900 to-gray-900 text-yellow-400 font-semibold shadow-lg hover:shadow-xl transition"
        >
          Book Your Session Now
        </motion.button>
      </section>
    );
  }

  // -------------------
  // Why Choose Us
  // -------------------
  function WhyChooseUs() {
    const items = [
      "Certified Experts",
      "Affordable",
      "Admission Support",
      "Scholarships/Loans Guidance",
    ];


    return (
    <section className="max-w-5xl mx-auto pt-0 pb-14 px-6">
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-3xl font-bold text-gray-900 text-center mb-4"
    >
      Why Choose Our Counseling
    </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
        >
          <CheckCircle2 className="text-yellow-400 w-6 h-6 mr-3" />
          <span className="text-lg font-medium text-gray-900">{item}</span>
        </motion.div>
      ))}
    </div>
  </section>


    );
  }

  // -------------------
  // Our Impact
  // -------------------
  function OurImpact() {
    const stats = [
      { value: "5,000+", label: "Students Counseled" },
      { value: "1,200+", label: "Admissions Completed" },
      { value: "50+", label: "Partner Universities" },
    ];
    return (
      <section className="bg-gray-900  text-yellow-500 py-16 pt-6 pb-12 px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-10"
        >
          Our Impact
        </motion.h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-4xl font-bold text-gray-900">{stat.value}</h3>
              <p className="mt-2 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // -------------------
  // Free Add-ons
  // -------------------


  function FreeAddOns() {
    const [openIndex, setOpenIndex] = useState(null);

    const addOns = [
      {
        title: "Career Personality Test Report",
        form: (
          <form className="space-y-4 mt-4 text-left">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <input
              type="number"
              placeholder="Age"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />
              <input
              type="text"
              placeholder="Grades"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <select className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none">
              <option>Choose specialization</option>
              <option>Science</option>
              <option>Commerce</option>
              <option>Arts</option>
            </select>
            <textarea
              rows={3}
              placeholder="Your Interests"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            ></textarea>
            <button className="px-6 py-2 bg-yellow-400 text-indigo-900 rounded-lg shadow hover:bg-yellow-500 transition">
              Generate Report
            </button>
          </form>
        ),
      },
      {
        title: "Top Scholarships List",
        form: (
          <form className="space-y-4 mt-4 text-left">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <input
              type="number"
              placeholder="Family Income (₹)"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <select className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none">
              <option>Select Category</option>
              <option>General</option>
              <option>OBC</option>
              <option>SC/ST</option>
            </select>
            <button className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg shadow hover:bg-yellow-500 transition">
              Show Scholarships
            </button>
          </form>
        ),
      },
      {
        title: "University Comparison PDF",
        form: (
          <form className="space-y-4 mt-4 text-left">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <select className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none">
              <option>Select First University</option>
              <option>University A</option>
              <option>University B</option>
            </select>
            <select className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none">
              <option>Select Second University</option>
              <option>University X</option>
              <option>University Y</option>
            </select>
            <button className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg shadow hover:bg-yellow-500 transition">
              Download PDF
            </button>
          </form>
        ),
      },
    ];

    return (
      <section className="max-w-4xl mx-auto py-12 px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          Free Add-ons with First Session
        </motion.h2>

        <div className="space-y-4">
          {addOns.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-900 text-yellow-400 font-semibold rounded-t-xl focus:outline-none"
              >
                {item.title}
                {openIndex === idx ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-4 pb-4"
                  >
                    {item.form}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    );
  }




  // -------------------
  // Testimonials (remade)
  // -------------------
  function Testimonials() {
    const feedback = [
      {
        quote:
          "I was confused after Class 12, but counseling helped me pick the right stream.",
        author: "Rahul, Pune",
      },
      {
        quote: "Affordable and helpful! Got admission support directly.",
        author: "Sneha, Delhi",
      },
    ];
    return (
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Student Testimonials
        </h2>
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
          {feedback.map((fb, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-2xl shadow-lg border border-yellow-200 hover:shadow-xl transition"
            >
              <p className="text-lg text-gray-900 italic mb-4">“{fb.quote}”</p>
              <span className="font-semibold text-gray-900">– {fb.author}</span>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // -------------------
  // Trust & Safety
  // -------------------
  function TrustSafety() {
    const points = [
      "✔ Partner University Logos",
      "✔ Secure Payment Badge",
      "✔ Certified Counselors",
    ];   
    return (
      <section className="bg-gray-900 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-yellow-500 mb-8">Trust & Safety</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {points.map((pt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white px-6 py-4 rounded-xl shadow-md hover:shadow-xl transition font-medium text-gray-900"
            >
              {pt}
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // -------------------
  // Booking Flow (with animations)
  // -------------------
  // -------------------
  // Multi-step Booking Flow
  // -------------------
  function BookingFlow() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      mobileNumber: '',
      ageDob: '',
      cityState: '',
      counselingType: '',
      sessionMode: '',
      sessionDate: '',
      timeSlot: '',
      currentClass: '',
      intendedCourse: '',
      questions: '',
      paymentMethod: '',
      agreeTerms: false,
      understandNonRefundable: false,
    });

    const handleChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateStep = () => {
      switch (step) {
        case 1:
          return formData.fullName && formData.email && formData.mobileNumber && formData.ageDob && formData.cityState;
        case 2:
          return formData.counselingType;
        case 3:
          return formData.sessionMode;
        case 4:
          return formData.sessionDate && formData.timeSlot;
        case 5:
          return formData.currentClass && formData.intendedCourse && formData.questions;
        case 6:
          return formData.paymentMethod;
        case 7:
          return formData.agreeTerms && formData.understandNonRefundable;
        default:
          return true;
      }
    };

    const handleNext = () => {
      if (validateStep()) {
        setStep(step + 1);
      } else {
        alert('Please fill all required fields before proceeding.');
      }
    };


const handleBook = async () => {
  // 1️⃣ Check if user is logged in
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("⚠ You are not logged in. Please signup/login first.");
    return;
  }

  // 2️⃣ Validate all required fields
  const requiredFields = [
    "fullName",
    "email",
    "mobileNumber",
    "ageDob",
    "cityState",
    "counselingType",
    "sessionMode",
    "sessionDate",
    "timeSlot",
    "currentClass",
    "intendedCourse",
    "paymentMethod",
    "agreeTerms",
    "understandNonRefundable",
  ];

  const missingFields = requiredFields.filter((field) => {
    const value = formData[field];
    // For checkboxes, ensure true; for others, ensure not empty
    if (field === "agreeTerms" || field === "understandNonRefundable") {
      return value !== true;
    }
    return !value || value.trim() === "";
  });

  if (missingFields.length > 0) {
    alert(`⚠ Please fill/accept all required fields:\n${missingFields.join(", ")}`);
    return;
  }

  // 3️⃣ Submit to backend
  try {
    const response = await axios.post(
      "https://acvora-07fo.onrender.com/api/counselling",
      { ...formData, userId }
    );

    // Success
    console.log("Counselling booked:", response.data);
    alert("✅ Your session has been successfully booked!");
    setStep(8); // show confirmation step
  } catch (error) {
    console.error("Error booking counselling:", error);

    // Friendly error message
    let message = "Failed to book session. Please try again.";
    if (error.response && error.response.data && error.response.data.error) {
      message = `Error: ${error.response.data.error}`;
    }
    alert(message);
  }
};


    return (
      <section id="booking" className="max-w-4xl mx-auto py-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-900 text-center mb-8"
        >
          Book Your Counseling Session
        </motion.h2>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Steps content */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                1. Personal Information
              </h3>
              <input
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-yellow-400"
              />
              <input
                placeholder="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-yellow-400"
              />
              <input
                placeholder="Mobile Number"
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => handleChange('mobileNumber', e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-yellow-400"
              />
              <input
                placeholder="Age / Date of Birth"
                value={formData.ageDob}
                onChange={(e) => handleChange('ageDob', e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-yellow-400"
              />
              <input
                placeholder="City & State"
                value={formData.cityState}
                onChange={(e) => handleChange('cityState', e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                2. Counseling Type
              </h3>
              <select 
                value={formData.counselingType}
                onChange={(e) => handleChange('counselingType', e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select Counseling Type</option>
                <option value="Career Counseling">Career Counseling</option>
                <option value="Education Counseling">Education Counseling</option>
                <option value="Study Abroad Counseling">Study Abroad Counseling</option>
              </select>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                3. Preferred Session Mode
              </h3>
              <select 
                value={formData.sessionMode}
                onChange={(e) => handleChange('sessionMode', e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select Session Mode</option>
                <option value="Video Call (Zoom/Google Meet)">Video Call (Zoom/Google Meet)</option>
                <option value="Audio Call">Audio Call</option>
                <option value="Chat Counseling">Chat Counseling</option>
              </select>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                4. Time Slot Selection
              </h3>
              <input
                type="date"
                value={formData.sessionDate}
                onChange={(e) => handleChange('sessionDate', e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-yellow-400"
              />
              <select 
                value={formData.timeSlot}
                onChange={(e) => handleChange('timeSlot', e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select Time Slot</option>
                <option value="Morning (10–1)">Morning (10–1)</option>
                <option value="Afternoon (2–5)">Afternoon (2–5)</option>
                <option value="Evening (6–9)">Evening (6–9)</option>
              </select>
            </div>
          )}

          {step === 5 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                5. Additional Information
              </h3>
              <select 
                value={formData.currentClass}
                onChange={(e) => handleChange('currentClass', e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select Current Stage</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 12">Class 12</option>
                <option value="UG">UG</option>
                <option value="PG">PG</option>
              </select>
              <input
                placeholder="Intended Course/Field"
                value={formData.intendedCourse}
                onChange={(e) => handleChange('intendedCourse', e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-yellow-400"
              />
              <textarea
                placeholder="Questions / Concerns"
                rows={3}
                value={formData.questions}
                onChange={(e) => handleChange('questions', e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          )}

          {step === 6 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                6. Payment
              </h3>
              <p className="mb-3 font-medium text-gray-900">
                First Session Fee: ₹49 only
              </p>
              <select 
                value={formData.paymentMethod}
                onChange={(e) => handleChange('paymentMethod', e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select Payment Method</option>
                <option value="UPI">UPI</option>
                <option value="Debit / Credit Card">Debit / Credit Card</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>
          )}

          {step === 7 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                7. Agreement
              </h3>
              <label className="flex items-center mb-2 text-gray-900">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                  className="mr-2 accent-yellow-400"
                />{" "}
                I agree to the Terms & Conditions
              </label>
              <label className="flex items-center mb-2 text-gray-900">
                <input
                  type="checkbox"
                  checked={formData.understandNonRefundable}
                  onChange={(e) => handleChange('understandNonRefundable', e.target.checked)}
                  className="mr-2 accent-yellow-400"
                />{" "}
                I understand the fee is non-refundable if missed
              </label>
            </div>
          )}

          {step === 8 && (
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                ✅ Booking Confirmed
              </h3>
              <p className="text-gray-600">
                Your session has been booked. Check ‘My Account &gt; My Sessions’
                for details.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            {step > 1 && step < 8 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-yellow-300 text-gray-900 rounded-lg hover:bg-yellow-400 transition"
              >
                Back
              </button>
            )}
            {step < 7 && (
              <button
                onClick={handleNext}
                className="ml-auto px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
              >
                Next
              </button>
            )}
            {step === 7 && (
              <button
                onClick={handleBook}
                className="ml-auto px-6 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow hover:bg-yellow-600 transition"
              >
                Book My Session – Pay ₹49
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }


  // -------------------
  // Contact Form
  // -------------------
  // function ContactForm() {
  //   return (
  //     <section className="max-w-3xl mx-auto py-16 px-6">
  //       <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
  //         Quick Enquiry Form
  //       </h2>
  //       <form className="space-y-4">
  //         {["Full Name", "Email", "Phone", "Course Interested"].map(
  //           (label, idx) => (
  //             <motion.input
  //               key={idx}
  //               type="text"
  //               placeholder={label}
  //               whileFocus={{ scale: 1.02 }}
  //               className="w-full px-4 py-3 rounded-xl border border-gray-400 bg-white text-indigo-900 shadow-sm focus:ring-2 focus:ring-yellow-400 hover:shadow-md transition"
  //             />
  //           )
  //         )}
  //         <motion.textarea
  //           placeholder="Your Message"
  //           rows={4}
  //           whileFocus={{ scale: 1.02 }}
  //           className="w-full px-4 py-3 rounded-xl border border-gray-400 bg-white text-indigo-900 shadow-sm focus:ring-2 focus:ring-yellow-400 hover:shadow-md transition"
  //         />
  //         <motion.button
  //           whileHover={{ scale: 1.05 }}
  //           whileTap={{ scale: 0.95 }}
  //           className="w-full py-3 rounded-xl bg-yellow-400 text-gray-900 font-semibold shadow-lg hover:bg-yellow-500 transition"
  //         >
  //           Submit Enquiry
  //         </motion.button>
  //       </form>
  //     </section>
  //   );
  // }

  // -------------------
  // Main Export
  // -------------------
  export default function Counselling() {
    return (
      <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 via-white to-yellow-100">
        <HeroSection />
        <WhyChooseUs />
        <OurImpact />
        <FreeAddOns />
        <Testimonials />
        <TrustSafety />
        <BookingFlow />
        {/* <ContactForm /> */}
      </div>
      <Footer />
      </>
    );
  }