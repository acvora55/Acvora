import React from "react";
import collegeBanner from ".././Images/pexels-idriss-meliani-2982449.jpg";
import Footer from "../components/Footer";
const UniversityDetails = () => {
  return (
    <>
      <section className=" bg-zinc-300">
        <div>
          <div className=" relative">
            <img src={collegeBanner} alt="" className=" h-[40vh] w-[100vw] " />
          </div>
          <div className=" absolute top-[10vw] left-[20vw] ">
            <h1 className=" text-[4rem] text-white font-bold">
              Chandigadh <span className=" text-yellow-500">University</span>
            </h1>
          </div>

          <div
            className="card mx-auto shadow max-w-[60vw] hover:cursor-pointer bg-indigo-200 
          rounded border mt-4 text-[20px]"
          >
            <h3 className=" font-bold m-5">ChandiGadh University</h3>
            <p className="m-5">Lorem ipsum dolor sit amet.</p>
            <p className=" m-5">Location:Chandigadh 2345</p>
            <p className=" m-5">Affliation:AICTE certified</p>
            <p className=" m-5">
              About: Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Maxime accusamus, ullam eum, laborum eveniet ad totam, commodi
              nesciunt doloremque iure aut expedita nisi quam quis? Aliquam
              illum totam natus voluptatum!
            </p>

            <div className=" flex justify-between m-5 flex-wrap">
              <button className=" border-[2px] bg-yellow-300 rounded-md m-2 p-2 hover:cursor-pointer hover:bg-white ">
                Apply Now
              </button>
              <button className=" border-[2px] bg-yellow-300 rounded-md m-2 p-2 hover:cursor-pointer hover:bg-white ">
                See Courses
              </button>
              <button className=" border-[2px] bg-yellow-300 rounded-md m-2 p-2 hover:cursor-pointer hover:bg-white ">
                Placement Data
              </button>
              <button className=" border-[2px] bg-yellow-300 rounded-md m-2 p-2 hover:cursor-pointer hover:bg-white ">
                Ranking
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default UniversityDetails;
