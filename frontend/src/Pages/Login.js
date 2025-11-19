import React from "react";
import ContactHeroSection from "../components/ContactHeroSection";
import Footer from "../components/Footer";
import GoogleAuth from "../components/GoogleAuth";
import FacebookAuth from "../components/FacebookAuth";

const Login = () => {
  return (
    <>
      <ContactHeroSection title="Login" />
      <div className="p-8 mt-9 ">
        <div className="max-w-[540px] mx-auto  px-4 md:p-24">
          <h2 className="font-semibold text-xl text-center sm:text-2xl md:text-3xl sm:font-bold p-2">
            LogIn
          </h2>
          <form className="max-w-xl mx-auto">
            <div className="flex flex-col my-5">
              <label
                className="p-0.5 text-sm font-semibold mb-1 text-gray-500 "
                htmlFor=""
              >
                Username or E-mail
              </label>
              <input
                className="bg-[#EDEDED] text-[#000000] p-2 font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400"
                type="text"
                required
              />
            </div>

            <div className="flex flex-col my-5">
              <label
                className="p-0.5 text-sm font-semibold mb-1 text-gray-500 "
                htmlFor=""
              >
                Password
              </label>
              <input
                className="bg-[#EDEDED] text-[#000000] p-2 font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400"
                type="password"
                required
              />
            </div>

            <div className="flex  my-5">
              <input type="checkbox" id="vehicle1" name="" value="" />
              <label
                className="p-0.5 ml-2 text-sm font-semibold mb-1 text-gray-500 "
                htmlFor=""
              >
                Keep me signed in
              </label>
            </div>

            <div className=" flex flex-col items-center md:flex-row md:space-x-2 w-full ">
              <button
                className="p-2 mb-2 md:mb-0 w-full bg-blue-600 hover:bg-transparent hover:text-black hover:border-2 text-center text-white font-semibold drop-shadow-lg"
                type="submit"
              >
                {" "}
                Register
              </button>
              <button
                className="p-2 w-full border-2 bg-transparent hover:bg-blue-600 hover:text-white font-semibold drop-shadow-lg"
                type="submit"
              >
                {" "}
                Login
              </button>
            </div>

            <div className="text-gray-500 text-center mt-5">
              <p className="text-md">Forgot Your Password</p>
            </div>
          </form>
          <p className="text-center mt-4">------- or -------</p>
          <div className="flex flex-col justify-center items-center mt-4">
            <FacebookAuth />
            <GoogleAuth />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
