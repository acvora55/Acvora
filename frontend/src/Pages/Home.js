import React, { useEffect, useState } from "react";
import CollegeCard from "../components/CollegeCard";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Header from "../components/Header";
import HigherStudies from "../components/HigherStudies";
import Info from "../components/Info";
import Marquee from "../components/Marquee";
import Newsletter from "../components/Newsletter";
import PlaceCard from "../components/PlaceCard";

import RegistrationModal from "../Modals/RegistrationModal";
import NewsAlerts from "../components/NewsAlerts";
import Testimonials from "../components/Testimonials";


const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowPopup(true), 10000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
     <div className="relative z-0 min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-white">
      {/* Background overlay - send to back */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,transparent_60%,rgba(13,148,136,0.08)_100%)]" />

      {/* Modal on top */}
      {showPopup && <RegistrationModal closeModal={setShowPopup} />}

      {/* Page Content */}
      <Header />
      {/* <TopColleges /> */}
      <CollegeCard />
      <PlaceCard />
      <HigherStudies />
      <Marquee />
      <Info />
      <NewsAlerts />
      <Testimonials />
      <Newsletter />
      <Form />
      <Footer />
    </div>
    </>
   
  );
};

export default Home;
