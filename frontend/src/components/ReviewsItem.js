import React from "react";

const ReviewItem = ({ item }) => {
  return (
    <>
      <div className="bg-[#f5f7fa] w-[17rem] sm:w-[22rem] md:w-[16rem] lg:w-[22rem] md:mx-2 lg:mx-0 h-[7rem] md:h-[7rem] lg:h-[7rem] p-5 lg:p-7 my-5 border-solid border-t-2 border-blue-600 text-center">
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold">{item.title}</h3>
          <p className="text-lg sm:text-xl font-bold">{item.numbers}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewItem;
