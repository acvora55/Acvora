import React from "react";
import ContactHeroSection from "../components/ContactHeroSection";
import Footer from "../components/Footer";

const PasswordReset = () => {
  return (
    <>
      <ContactHeroSection title="Login" />
      <div className="p-8 mt-9 ">
        <div className="max-w-[640px] mx-auto  px-4 md:p-24">
          <h2 className="font-semibold text-xl text-center sm:text-2xl md:text-3xl sm:font-bold p-2">
            Password Reset
          </h2>

          <div className="flex flex-col my-5">
              <p className="mb-4 text-gray-500 sm:text-lg">To reset your password, please enter your email address or username below.</p>
              <input className="bg-[#EDEDED] text-[#000000] p-2 font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400" type="text" placeholder="Enter Your Username or E-mail" required/>
            </div>

            <div className="my-5 bg-blue-600 hover:bg-blue-700 text-center text-white font-semibold">
            <button className="p-2" type="button"> Reset Password</button>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PasswordReset;
