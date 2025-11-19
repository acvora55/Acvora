import React from "react";
import profile from "../Images/regpic.webp";

// Single card with teal hover + scale (larger)
const InfoCard = ({ title, description, imageSrc }) => {
  return (
    <article
      className="
        group relative w-full max-w-[22rem] sm:max-w-[24rem] mx-auto
        rounded-xl border border-yellow-200 bg-white
        shadow
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-lg
        focus-within:ring-2 focus-within:ring-yellow-400
      "
      aria-label={title}
      tabIndex={0}
      role="article"
    >
      <div className="flex items-center">
        <img
          src={imageSrc}
          alt={title}
          className="
            h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32
            p-3 sm:p-3.5 object-cover rounded-l-xl
            transition-all duration-300
            group-hover:grayscale
          "
        />
        <div
          className="
            flex-1 p-3 sm:p-4 md:p-5
            bg-white border-l-2 border-yellow-200 rounded-r-xl
            transition-colors duration-300
            group-hover:bg-transparent group-hover:border-yellow-300
          "
        >
          <h3
            className="
              text-base sm:text-lg md:text-xl font-semibold
              text-gray-900
              transition-colors duration-300
              group-hover:text-gray-950
              line-clamp-2
            "
          >
            {title}
          </h3>
          <p
            className="
              mt-1.5 sm:mt-2 text-sm sm:text-base md:text-lg text-gray-700
              transition-colors duration-300
              group-hover:text-gray-950
              line-clamp-2
            "
          >
            {description}
          </p>
        </div>
      </div>

      <span
        className="
          pointer-events-none absolute inset-0 rounded-xl
          ring-0 ring-teal-300/0
          transition-all duration-300
          group-hover:ring-2 group-hover:ring-yellow-300/90
        "
      />
    </article>
  );
};

const Marquee = () => {
  // Different content for each card
  const cards = [
    {
      title: "Postgraduate Diploma in Computer Applications / Data Science",
      description: "Explore top-rated diploma colleges with rankings.",
      imageSrc: profile,
    },
    {
      title: "Postgraduate Diploma in Business Management",
      description: "Check details of top diploma colleges and admission info.",
      imageSrc: profile,
    },
    {
      title: "Diploma in Physiotherapy / Rehabilitation Therapy",
      description: "Find the best diploma programs with placement details.",
      imageSrc: profile,
    },
    {
      title: "Diploma in Optometry / Ophthalmic Technology",
      description: "See the list of Optometry / Ophthalmic diploma institutes.",
      imageSrc: profile,
    },
    {
      title: "Diploma in Pharmacy / Pharma Technician",
      description: "Discover colleges offering high-quality  Pharma diplomas.",
      imageSrc: profile,
    },
    {
      title: "Diploma in Fashion Design / Apparel Design",
      description: "Check out colleges with top Apparel Design  diplomas.",
      imageSrc: profile,
    },
  ];

  return (
    <section className="my-5">
      <div
        className="
          w-full bg-gray-900
          px-6 sm:px-7 lg:px-10
          py-5 sm:py-7 lg:py-10
        "
      >
        <div className="mx-auto w-full max-w-6xl">
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              xl:grid-cols-3
              gap-4 sm:gap-6 lg:gap-8
              items-start
            "
          >
            {cards.map((c, idx) => (
              <InfoCard
                key={idx}
                title={c.title}
                description={c.description}
                imageSrc={c.imageSrc}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
