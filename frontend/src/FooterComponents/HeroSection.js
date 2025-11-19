import React from 'react'

const HeroSection = () => {
  return (
    <>
      <section className='w-full h-screen lg:h-[40rem] bg-gradient-to-r from-blue-700 to-sky-300 box-border pt-12 lg:pt-6 '>
        <div className='flex flex-col items-center justify-evenly lg:flex-row w-full h-full p-4 space-y-4 '>
            <div className='w-[28rem] lg:w-[30rem] h-[20rem] flex flex-col items-start justify-center  mx-auto px-4 pl-6 space-y-3'>
                <h1 className='text-white font-semibold text-3xl lg:text-4xl font-serif'>B.TECH COMPANION</h1>
                <h2 className='text-white font-medium text-lg lg:text-xl italic'>Your one-stop B.Tech Counselling package with</h2>
                <p className=' text-gray-200 text-lg lg:text-xl'>15+ College Predictors, a printed Almanac with 1000+ FAQs on Admissions, Webinars & more</p>
            </div>

            <div  className='w-[28rem] flex flex-col items-start justify-center mx-auto px-3 space-y-3'>
                <form className=" mx-auto bg-white w-[25rem] px-16 h-[28rem] rounded-lg flex flex-col justify-center shadow-xl">

                    <h2 className='text-md font-serif mb-5 text-gray-500'>Start here and get your own B.tech companion package NOW!</h2>
                    <div className="flex flex-col ">
                        <label className="" htmlFor="Name"></label>
                        <input name='Name'
                        id='Name' className="bg-transparent outline-none border-x-0 border-t-0 text-[#000000] py-2   outline-0  border-2 border-b-[#777771] placeholder:font-serif font-thin  hover:border-b-gray-400 text-sm " type="text" placeholder='Name' required/>
                    </div>

                    <div className=" my-5">
                        <label className="" htmlFor="Email"></label>
                        <input name='Email'
                        id='Email' className="bg-transparent outline-none border-x-0 border-t-0 text-[#000000] py-2 w-full outline-0  border-2 border-b-[#777771] placeholder:font-serif font-thin hover:border-b-gray-400 text-sm" type="email" placeholder='Email' required/>
                    </div>

                    <div className=" my-1">
                        <label className="" htmlFor="Mobile"></label>
                        <input name='Mobile'
                        id='Mobile' className="bg-transparent outline-none border-x-0 border-t-0 text-[#000000] py-2 w-full outline-0  border-2 border-b-[#777771] placeholder:font-serif font-thin hover:border-b-gray-400 text-sm" type="tel" placeholder='Mobile' required/>
                    </div>

                    <div className=" my-4">
                        <label className="" htmlFor="City"></label>
                        <input name='City'
                        id='City' className="bg-transparent outline-none border-x-0 border-t-0 text-[#000000] py-2 w-full outline-0  border-2 border-b-[#777771] placeholder:font-serif font-thin hover:border-b-gray-400 text-sm" type="text" placeholder='Current City' required/>
                    </div>


                    <div className=" w-full ">
                        <button className="p-2 mb-2 md:mb-0 w-full bg-blue-600 hover:bg-transparent hover:text-black border-2 text-center text-white font-semibold drop-shadow-lg" type="button"> Start Now</button>
                    </div>

                    <p className='text-center font-semibold pt-3 '>Already Have an account? <span className='font-semibold text-blue-500 cursor-pointer'>Sign In</span></p>
                </form>
            </div>
        </div>  
      </section>
    </>
  )
}

export default HeroSection
