import React from "react";

const PlaceCardItem = ({item}) => {
  return (
    <>
      <div  className="bg-black/40 w-[17rem] sm:w-[22rem] md:w-[16rem] lg:w-[30rem] md:mx-2 lg:mx-0 h-[7rem] md:h-[8rem] lg:h-[16rem]   my-10 border-solid border-t-2 border-black relative">
      <img src={item.img} alt="/" className="w-full h-full absolute object-cover mix-blend-overlay" />
        <div className=" text-white h-full flex flex-col justify-end p-3 lg:pl-4">
          <p className="text-lg drop-shadow-lg ">{item.place}</p>
        </div>
      </div>
    </>
  ); 
};

export default PlaceCardItem;
