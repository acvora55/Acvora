import React from "react";

const HigherStudiesItem = ({item}) => {
  return (
    <>
      <div  className="bg-black/50 w-[17rem] sm:w-[22rem] md:w-[16rem] lg:w-[30rem] md:mx-2 lg:mx-0 h-[9rem] md:h-[9.3rem] lg:h-[16rem]   my-10 border-solid border-t-2 border-black relative">
      <img src={item.img} alt="/" className="w-full h-full absolute object-cover mix-blend-overlay" />
        <div className=" text-white h-full flex flex-col justify-end p-2 lg:pl-4">
          <h3 className="text-lg font-semibold md:leading-tight lg:leading-none drop-shadow-lg">{item.Uname}</h3>
          <p className="text-lg drop-shadow-lg ">{item.Uplace}</p>
        </div>
      </div>
    </>
  );
}; 

export default HigherStudiesItem;
