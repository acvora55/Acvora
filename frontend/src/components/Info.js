import React from "react";
import { infodata } from "./data";
import InfoItem from "./InfoItem";

const Info = () => {
  return (
    <>
      {/* Full-width teal band */}
      <div className="w-full">
        {/* Centered content with responsive padding */}
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-10 py-5 sm:py-6 lg:py-10">
          {/* 1 col (mobile), 2 cols (sm), 3 cols (md and up) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {infodata.map((item) => (
              <InfoItem item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
