import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TopColleges() {
  const colleges = [
    { 
      title: "Lovely Professional University", 
      image: "/Lpu.jpeg",
      location: "Phagwara, Punjab",
      website: "https://www.lpu.in",
    },
    { 
      title: "Chandigarh University", 
      image: "/Chandigarh .jpeg",
      location: "Chandigarh,Punjab",
      website: "https://www.cuchd.in",
    },
    { 
      title: "VIT-Vellore Institute of Technology", 
      image: "/Vit.jpeg",
      location: "Vellore, Tamil Nadu",
      website: "https://vit.ac.in",
    },
    { 
      title: "IIT Delhi", 
      image: "/Iit Delhi.jpeg",
      location: "Delhi",
      website: "https://home.iitd.ac.in/",
    },
    { 
      title: "BITS Pilani", 
      image: "/Bits.jpeg",
      location: "Hyderabad,Telangana",
      website: "https://www.bits-pilani.ac.in",
    },
    { 
      title: "SRM University", 
      image: "/Srm.jpeg",
      location: "Kattankulathur, Chennai",
      website: "https://www.srmist.edu.in/",
    }
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Create infinite loop by duplicating slides
  const extendedColleges = [...colleges, ...colleges, ...colleges];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) setSlidesToShow(1);
      else if (window.innerWidth < 768) setSlidesToShow(2);
      else setSlidesToShow(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [slidesToShow]);

  const handleNextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide(prev => {
      if (prev >= colleges.length) {
        // After a brief pause, reset to beginning without animation
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentSlide(0);
        }, 50);
        return prev + 1;
      }
      return prev + 1;
    });
  };

  const handlePrevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide(prev => {
      if (prev <= 0) {
        // After a brief pause, reset to end without animation
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentSlide(colleges.length);
        }, 50);
        return prev - 1;
      }
      return prev - 1;
    });
  };

  const transformValue = `translateX(-${currentSlide * (100 / slidesToShow)}%)`;
  const transitionStyle = isTransitioning ? { transition: "transform 0.5s ease-in-out" } : { transition: "none" };

  const openWebsite = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-12 bg-gray-100 px-5">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          Top Colleges/University for MBBS, B.Tech, MBA
          <div className="h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mt-2 w-1/6 mx-auto"></div>
        </motion.h2>
       
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Slider */}
        <div className="overflow-hidden px-4">
          <div 
            className="flex"
            style={{ 
              transform: transformValue,
              ...transitionStyle
            }}
          >
            {extendedColleges.map((item, index) => (
              <div 
                key={index} 
                className="px-3 flex-shrink-0"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white  shadow-xl overflow-hidden hover:shadow-2xl transform transition-all duration-300 hover:scale-105 h-full flex flex-col border border-yellow-100"
                >
                  <div className="h-48 overflow-hidden relative cursor-pointer"
                  onClick={() => openWebsite(item.website)}
                   >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                    />
                  </div>
                  <div className="p-2 flex-grow">
                    <h3 className="text-yellow-500 leading-relaxed">{item.title}</h3>
                    {item.location && (
                          <p className="mt-1 text-sm text-yellow-700/80 line-clamp-1">
                            {item.location}
                          </p>
                        )}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center mt-4">
          {colleges.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentSlide(index);
              }}
              className={`mx-1.5 rounded-full transition-all ${currentSlide % colleges.length === index ? "bg-rose-600 scale-125" : "bg-gray-300 hover:bg-rose-400"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}