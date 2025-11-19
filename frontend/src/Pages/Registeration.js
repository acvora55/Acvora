import React, { useEffect } from 'react'
import ContactHeroSection from '../components/ContactHeroSection'
import Footer from '../components/Footer'
import GoogleAuth from '../components/GoogleAuth';
import FacebookAuth from '../components/FacebookAuth';
import axios from 'axios';
import { host } from '../helper';
const Registeration = () => {

  useEffect(()=>{
    axios.post(`${host}register`,{})
  })


  const [register,setregister] = {
    "username":""
  }
  return (
    <>
    <ContactHeroSection title = "Register"/>
    <div className="p-8 mt-9 ">
        <div className='max-w-[1040px] mx-auto  px-4 md:p-16'>
        <h2 className='font-semibold text-xl text-center sm:text-2xl md:text-3xl sm:font-bold'>Register</h2>
        <form className="max-w-xl mx-auto">

            <div className="flex flex-col my-5">
              <label className="p-0.5 text-sm font-semibold mb-1 text-gray-500 " htmlFor="">Username</label>
              <input name = "username" className="bg-[#EDEDED] text-[#000000] p-2 font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400" type="text" placeholder="E.g. @vishal" required/>
            </div>

            <div className="flex flex-col my-5">
              <label className="p-0.5 text-sm font-semibold mb-1 text-gray-500 " htmlFor="">First Name </label>
              <input className="bg-[#EDEDED] text-[#000000] p-2 font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400" type="text" placeholder="E.g. vishal" required/>
            </div>

            <div className="flex flex-col my-5">
              <label className="p-0.5 text-sm font-semibold mb-1 text-gray-500 " htmlFor="">Last Name </label>
              <input className="bg-[#EDEDED] text-[#000000] p-2 font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400" type="text" placeholder="E.g. kumar" required/>
            </div>

            <div className="flex flex-col my-5">
              <label className="p-0.5 text-sm font-semibold mb-1 text-gray-500 " htmlFor="">E-mail Address </label>
              <input className="bg-[#EDEDED] text-[#000000] p-2 font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400" type="email" placeholder="E.g. vishal@123.com" required/>
            </div>

            <div className="flex flex-col my-5">
              <label className="p-0.5 text-sm font-semibold mb-1 text-gray-500 " htmlFor="">Password</label>
              <input className="bg-[#EDEDED] text-[#000000] p-2 font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400" type="password" />
            </div>

            <div className="flex flex-col my-5">
              <label className="p-0.5 text-sm font-semibold mb-1 text-gray-500 " htmlFor="">Confirm Password</label>
              <input className="bg-[#EDEDED] text-[#000000] p-2 font-semibold outline-0 border-solid border-2 border-[#777771] hover:border-blue-400" type="password" />
            </div>
            

            <div className="my-5 flex flex-col md:flex-row md:space-x-2 w-full space-y-2 md:space-y-0">
                <button className="p-2  w-full bg-blue-600 hover:bg-blue-700 text-center text-white font-semibold drop-shadow-lg" type="submit"> Register</button>
                <button className="p-2  w-full border-2 bg-transparent hover:bg-blue-600 hover:text-white font-semibold drop-shadow-lg" type="submit"> Login</button>
            </div>
</form>
        </div>
    </div>

    <p className='text-center mt-4'>------- or -------</p>
            <div className='flex flex-col justify-center items-center mt-4'>
              <FacebookAuth/>
              <GoogleAuth/>

            </div>
    <Footer/>  
    </>
  )
}

export default Registeration
