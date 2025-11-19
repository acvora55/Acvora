import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Testimonials & Success Stories
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          spaceBetween={40}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="rounded-xl pb-12"
        >
          {[
            {
              name: "John Doe",
              img: "/images.jpeg",
              text: "This university changed my life! The professors were supportive and the programs prepared me for my career.",
            },
            {
              name: "Jane Smith",
              img: "/images.jpeg",
              text: "The scholarship I received made my dreams come true. I’m now working at a Fortune 500 company!",
            },
            {
              name: "Alex Johnson",
              img: "/images.jpeg",
              text: "Amazing campus and great opportunities for networking. Highly recommended!",
            },
            {
              name: "Sophia Lee",
              img: "/images.jpeg",
              text: "I loved my time here! The internships I got through campus placements boosted my confidence.",
            },
          ].map((testimonial, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white hover:bg-yellow-600 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2 border border-yellow-100">
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="w-28 h-28 rounded-full mx-auto mb-6 object-cover border-4 border-gray-200 shadow-md"
                />
                <p className="text-gray-700 text-center mb-4 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="text-yellow-500 font-semibold text-center">
                  – {testimonial.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev !text-gray-700 !bg-white shadow-md !rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-all duration-300 absolute top-1/2 -left-6 z-10"></div>
        <div className="swiper-button-next !text-gray-700 !bg-white shadow-md !rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-all duration-300 absolute top-1/2 -right-6 z-10"></div>
      </div>
    </section>
  );
}
