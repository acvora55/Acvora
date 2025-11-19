import React from "react";
import { Link } from "react-router-dom";

const InfoItem = ({item}) => {
  return (
    <>
      <div className="bg-[#f5f7fa] w-[18rem] sm:w-[22rem] p-4 h-[14rem] my-5 border-solid border-y-2 border-blue-600 flex flex-col  justify-evenly">
      <Link to={item.link}><h3 className="text-xl font-bold hover:text-blue-500">{item.heading}</h3></Link>
        <p className="text-[16px]  leading-6">{item.para}</p>
      </div>
    </>
  );
};

export default InfoItem;
