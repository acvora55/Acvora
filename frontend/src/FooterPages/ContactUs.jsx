import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "Student",
    message: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 4000);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      category: "Student",
      message: "",
    });
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* Hero Section */}
        <header
        className="relative bg-gray-200 text-white text-center py-20 "
        style={{
        
          backgroundBlendMode: 'multiply',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
      <section className="flex flex-col items-center justify-center text-center py-2 px-0 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold mb-7 text-black drop-shadow-lg">
          We’d Love to Hear from You
        </h1>
        <p className="text-xl md:text-2xl max-w-xl text-yellow-500 font-semibold">
          Whether you’re a student, institute, or partner — we’re here to help.
        </p>
        <div className="max-w-6xl mx-auto bg-gray-900 flex items-center justify-center py-8 px-4 mt-6 grid grid-cols-1 md:grid-cols-4 gap-6 rounded-lg shadow-lg">
         {[
          {
            icon: <i className="fa-solid fa-location-dot text-yellow-400"></i>,
            label: "Office Address",
            detail: "123 Edu Tower, Connaught Place, New Delhi, India",
          },
          {
            icon: <i className="fa-solid fa-phone-volume text-yellow-400"></i>,
            label: "Phone",
            detail: "+91 xxxxxxxx (Mon–Sat, 9 AM – 7 PM)",
          },
          {
            icon: <i className="fa-solid fa-envelope text-yellow-400"></i>,
            label: "Email",
            detail: (
              <a
                href="mailto:support@yourdomain.com"
                className="underline hover:text-yellow-300"
              >
                support@yourdomain.com
              </a>
            ),
          },
          {
            icon: <i className="fa-solid fa-comment-dots text-yellow-400"></i>,
            label: "Live Chat",
            detail: (
              <button
                className="underline hover:text-yellow-300"
                onClick={() => alert("Launching live chat widget...")}
              >
                Click here to chat now
              </button>
            ),
          },
        ].map(({ icon, label, detail }) => (
          <div
            key={label}
            className="text-center text-white hover:text-yellow-300 transition-all duration-500 animate-slideUp"
          >
            <span className="text-3xl block mb-2">{icon}</span>
            <h3 className="font-bold text-sm mb-1">{label}</h3>
            <p className="text-xs">{detail}</p>
          </div>
        ))}
        </div>

      </section>
      </header>

      {/* Contact Section */}
      <section
        id="contact"
        className=" px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-16"
      >
        {/* Left: Contact Form with Heading */}
        <div className="flex flex-col bg-white rounded-xl px-8 py-5 shadow-lg animate-fadeInUp">
          <h2 className="text-2xl font-bold mb-6 text-left text-gray-800">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
            <div>
              <label
                className="text-left block mb-1 font-semibold text-gray-800"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div>
              <label
                className="text-left block font-semibold text-gray-800"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="text-left w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div>
              <label
                className="text-left block mb-1 font-semibold text-gray-800"
                htmlFor="phone"
              >
                Phone Number (optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="text-left w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div>
              <label
                className="text-left block mb-1 font-semibold text-gray-800"
                htmlFor="category"
              >
                Select Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="text-left w-full border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              >
                <option>Student</option>
                <option>Institute</option>
                <option>Agent</option>
                <option>Partner</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label
                className="text-left block mb-1 font-semibold text-gray-800"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="text-left w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-gray-800 hover:bg-yellow-400 text-white hover:text-blue-900 font-bold py-3 px-6 rounded-md transition-colors duration-300"
            >
              Send Message
            </button>

            {showConfirmation && (
              <div className="mt-6 p-4 bg-yellow-200 text-yellow-900 rounded-md text-center font-semibold animate-fadeInUp">
                Thanks! Our team will reach you within 24 hours.
              </div>
            )}
          </form>
        </div>

        {/* Right: Map + Heading */}
        <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow animate-fadeIn">
          <h2 className="text-2xl font-bold mb-4 text-left">Location</h2>
          <div className="flex-grow">
            <iframe
              title="HQ Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14029.326496819668!2d77.21918441126445!3d28.63201992701721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03ff891a5a17%3A0x503f0d07e8fdf80!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001%2C%20India!5e0!3m2!1sen!2sus!4v1695210000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg border-0"
              style={{ border: 0, minHeight: "300px" }}
            ></iframe>
          </div>
        </div>
      </section>

      {/* Team / Support Info */}
      <section className="max-w-6xl mx-auto px-6 mb-20 text-center animate-fadeInUp">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Real people, ready to support your journey.
        </h2>
        <div className="flex justify-center gap-8 flex-wrap">
          {[
            { name: "Satyam", img: "" },
            { name: "Purnima", img: "" },
            { name: "Ankit", img: "" },
            { name: "Mohan", img: "" },
          ].map(({ name, img }) => (
            <div key={name} className="flex flex-col items-center space-y-2">
              <img
                src={img || "https://via.placeholder.com/80"}
                alt={name}
                className="w-20 h-20 rounded-full border-2 border-yellow-500 shadow-md hover:scale-105 transform transition-transform duration-300"
              />
              <p className="text-gray-800 font-semibold">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Media Links */}
      <footer className="bg-gray-800 py-6">
        <div className="max-w-6xl mx-auto flex justify-center space-x-8 text-yellow-300 text-2xl animate-fadeIn">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-yellow-400 transition-colors"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-yellow-400 transition-colors"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:text-yellow-400 transition-colors"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-yellow-400 transition-colors"
          >
            <i className="fa-brands fa-square-twitter"></i>
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="hover:text-yellow-400 transition-colors"
          >
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
      </footer>

      {/* CTA Banner */}
      <section className="bg-yellow-300 text-blue-900 py-8 px-6 flex flex-col md:flex-row justify-center items-center gap-8 font-semibold animate-slideIn">
        <div className="hover:underline cursor-pointer">
          Looking for scholarships? →{" "}
          <a href="#scholarships" className="text-blue-700">
            Explore Now
          </a>
        </div>
        <div className="hover:underline cursor-pointer">
          Institutes: Grow with us →{" "}
          <a href="#partner" className="text-blue-700">
            Partner With Us
          </a>
        </div>
      </section>

      {/* Tailwind animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateX(-40px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards;
        }
        .animate-slideIn {
          animation: slideIn 1s ease forwards;
        }
      `}</style>
    </div>
    <Footer />
    </>
  );
};

export default ContactUs;