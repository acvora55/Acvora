import React from 'react'
import Image1 from '../Images/btech-cp.png'
import Image2 from '../Images/webinar-companion.png'

const CardItems = () => {
  return (
    <>
      <section className=' w-full h-full grid place-items-center p-9 box-border '>
            <div className='flex flex-col lg:flex-row px-5 space-y-3 lg:space-y-0 lg:gap-52 '>
                <div className='h-[12rem] flex flex-col items-start justify-center space-y-2 my-auto'> 
                    <h2 className='text-xl font-semibold'>College Predictors</h2>
                    <p className='text-md lg:text-lg text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                    <p className='text-md lg:text-lg text-gray-600'>Lorem ipsum dolor sit amet consectetur</p>
                </div>
                <div className='h-[16rem]'>
                    <img className="w-96"src={Image1} alt="/" />
                </div>
            </div>

      </section>  
          
      <section className=' w-full h-full grid place-items-center p-9 box-border'>
            <div className='flex flex-col lg:flex-row px-5 space-y-3 lg:space-y-0 lg:gap-52'>

                <div className='h-[16rem]'>
                    <img className="w-96"src={Image2} alt="/" />
                </div>
                <div className='h-[12rem] flex flex-col items-start justify-center space-y-2 my-auto'> 
                    <h2 className='text-xl font-semibold'>Webinar</h2>
                    <p className='text-md lg:text-lg text-gray-600'>Exclusive Online Sessions for Students / Parents</p>
                    <p className='text-md lg:text-lg text-gray-600'>Get your queries resolved live by our panel of Experts</p>
                </div>
            </div>
      </section>  
    </>
  )
}

export default CardItems
