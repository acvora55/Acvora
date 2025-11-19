import React from 'react'
import contactImage from '../Images/login.avif';


const ContactHeroSection = (props) => {
  return (
    <>
      <div className='w-full h-[400px] absolute bg-slate-900/60 '>
        <img className='w-full h-full object-cover mix-blend-overlay' src={contactImage} alt="" />
    </div>

    <div className='flex space-x-4 pl-6 '>
        {/* <p className='text-white text-2xl font-bold h-[350px] flex flex-col justify-center'>logo</p> */}
        <p className='text-white text-2xl font-bold h-[350px] flex flex-col justify-center z-10'>{props.title}</p>
    </div>
    </>
  )
}

export default ContactHeroSection
