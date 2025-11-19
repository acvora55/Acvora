import React from 'react';

const Abtnv = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      {/* Hero Section */}
      <section
        className="relative flex flex-col justify-center items-center text-center px-6 py-10 bg-cover bg-center"
        style={{
          backgroundBlendMode: 'multiply',
          backgroundColor: 'rgba(1, 8, 22, 0.85)',
        }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight max-w-4xl text-white drop-shadow-md">
          Empowering Students, Connecting Institutes, Shaping Futures.
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-yellow-500 max-w-2xl font-medium">
          Your trusted partner in navigating education and career success.
        </p>
        <div className="mt-8 flex flex-wrap justify-center mt-5 gap-6">
          <a
            href="#explore"
            className="px-8 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
          >
            Explore Courses
          </a>
          <a
            href="#join-institute"
            className="px-8 py-3  bg-gray-900 text-yellow-500 font-semibold rounded-lg border-2 border-yellow-500 hover:bg-yellow-500 hover:text-gray-900 transition"
          >
            Join as Institute
          </a>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className=" bg-gray-100 py-20 px-6   text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Who We Are</h2>
        <p className="text-lg text-gray-800 max-w-3xl mx-auto mb-12">
          A one-stop platform dedicated to simplifying every student's education journey by connecting students,
          institutions, and trusted partners globally.
        </p>

        <div className="flex flex-wrap justify-center gap-12 max-w-5xl mx-auto">
          {[
            { label: 'Students', icon: '🎓' },
            { label: 'Institutes', icon: '🏫' },
            { label: 'Study Abroad', icon: '🌍' },
            { label: 'Agents', icon: '🤝' },
            { label: 'Smart Tools', icon: '🛠️' },
          ].map(({ label, icon }) => (
            <div
              key={label}
              className="flex flex-col items-center space-y-3 max-w-xs"
              title={label}
            >
              <div
                className="text-6xl rounded-full bg-yellow-500 bg-opacity-20 text-yellow-500 p-5 shadow-md"
                aria-hidden="true"
              >
                {icon}
              </div>
              <span className="text-xl font-semibold text-gray-800">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-gray-100 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Mission &amp; Vision</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-gray-800 p-10 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-500">Mission</h3>
            <p className="text-lg text-white">
              Helping students make informed career decisions through trusted information, tools, and dedicated support.
            </p>
          </div>
          <div className="bg-gray-800 p-10 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-500">Vision</h3>
            <p className="text-lg text-white">
              To be the largest trusted education ecosystem globally, empowering millions to fulfill their potential.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 px-6  text-center bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">What We Offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10  max-w-6xl mx-auto">
          {[
            {
              title: 'Course & University Search',
              description: 'Find and compare courses and institutes worldwide with ease.',
              icon: '🔍',
            },
            {
              title: 'Exam & Study Materials',
              description: 'Prep tools, notes, mock tests to boost your confidence.',
              icon: '📚',
            },
            {
              title: 'Scholarships & Loans',
              description: 'Explore funding options to make your education affordable.',
              icon: '💰',
            },
            {
              title: 'Career Counseling',
              description: '1-on-1 expert guidance tailored for your success.',
              icon: '🎯',
            },
            {
              title: 'Study Abroad Support',
              description: 'Visa, SOP/LOR assistance and country guides made simple.',
              icon: '✈️',
            },
            {
              title: 'Institute & Agent Portals',
              description: 'Self-managed dashboards for seamless institute and agent operations.',
              icon: '🗂️',
            },
          ].map(({ title, description, icon }) => (
            <div
              key={title}
              className="flex flex-col items-center p-6 rounded-lg border bg-gray-800 border-yellow-800 hover:shadow-xl transition-shadow cursor-default"
            >
              <div
                className="text-6xl mb-6 text-yellow-500"
                aria-hidden="true"
              >
                {icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-yellow-500">{title}</h3>
              <p className="text-white max-w-xs">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us (Trust Builders) Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
          {[
            { stat: '10,000+', label: 'Students Guided', icon: '🎓' },
            { stat: '500+', label: 'Institutes Onboarded', icon: '🏫' },
            { stat: '1000+', label: 'Courses Listed', icon: '📚' },
            { stat: 'India + Abroad', label: 'Global Reach', icon: '🌍' },
          ].map(({ stat, label, icon }) => (
            <div
              key={label}
              className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-default"
            >
              <div className="text-5xl mb-4 text-yellow-500">{icon}</div>
              <span className="text-4xl font-extrabold text-yellow-500">{stat}</span>
              <span className="text-lg font-medium text-yellow-500 mt-2">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Our Team Section */}
      {/* <section className="bg-white py-20 px-6 max-w-7xl mx-auto text-center rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Our Team</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
          Advisory Board of Education Experts | Tech & Data Team | Counseling Specialists (Anonymous but Verified)
        </p>
      </section> */}

      {/* Testimonials Section */}
      {/* <section className="py-20 px-6 max-w-7xl mx-auto text-center bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Testimonials</h2>
        <div className="max-w-5xl mx-auto grid gap-16 md:grid-cols-2">
          {[
            {
              quote:
                "This platform transformed my education journey. The tools and guidance were top-notch!",
              author: "Sonal R., Student",
              rating: 5,
            },
            {
              quote: "As an institute, onboarding was seamless and the management tools are fantastic.",
              author: "Dr. Rajesh M., Institute Head",
              rating: 4,
            },
          ].map(({ quote, author, rating }, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <p className="text-lg italic text-white mb-6">“{quote}”</p>
              <div className="flex items-center justify-center space-x-3 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${
                      i < rating ? 'text-yellow-500' : 'text-white'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.388 2.462c-.783.57-1.838-.196-1.538-1.118l1.287-3.974a1 1 0 00-.364-1.118L3.61 9.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.975z" />
                  </svg>
                ))}
              </div>
              <p className="font-semibold text-white">{author}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Call to Action Bottom Banner */}
      <section className="bg-gray-900 text-yellow-500 py-16 px-6 flex flex-col items-center text-center space-y-6">
        <h2 className="text-4xl font-extrabold max-w-3xl leading-tight">
          Ready to Start Your Education Journey?
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
          <a
            href="#explore"
            className="px-10 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
          >
            Explore Courses
          </a>
          <a
            href="#register-institute"
            className="px-10 py-4 border-2 border-yellow-500 rounded-lg font-semibold text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 transition"
          >
            Register as Institute
          </a>
        </div>
      </section>
    </div>
  );
};

export default Abtnv;
