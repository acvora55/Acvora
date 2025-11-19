import React from 'react'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'
import {AiFillInstagram, AiFillFacebook, AiFillTwitterCircle} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'
import Footer from '../components/Footer'
import ContactHeroSection from '../components/ContactHeroSection'

const Contact = () => {
  return (
    <>
    <section className=''>
    <ContactHeroSection title = "Contact"/>
    <div className='p-8 lg:p-16 mt-9 lg:w-[50%]'>
        <div className=''>
            <h1 className='font-bold text-2xl lg:text-3xl my-3'>Reach out to us for a consultation today</h1>
            <p className='my-4 py-2 lg:text-lg'>Pretium lorem primis senectus habitasse lectus scelerisque donec 
            ultricies tortor suspendisse adipiscing fusce morbi volutpat risus curae malesuada.
            Dignissim lacus convallis massa mauris enim mattis magnis senectus montes mollis taciti phasellus semper.</p>

            <div className='space-y-2 lg:text-lg'>

            <div className='flex items-center '>
                <BsFillTelephoneFill/>
                <span className='p-1 ml-1'>800.555.4242</span>
            </div>

            <div className='flex items-center '>
                <MdEmail/>
                <span className='p-1 ml-1'>Email Address</span>
            </div>

            <div className='flex items-center '>
                <FaMapMarkerAlt/>
                <span className='p-1 ml-1'>
                      Cloud IT Solutions
                      42 Cumulus Drive
                      Orlando, FL 32804
                </span>
            </div>
                
            </div>
                
        </div>

        <div className='mt-10'>
            <p className='text-xl lg:text-xl font-bold'>Join Us Online</p>
            <div className='my-2 text-xl lg:2xl flex space-x-3'>
            <AiFillInstagram/>
            <AiFillFacebook/>
            <AiFillTwitterCircle/>
            </div>
        </div>


    </div>
    </section>
    <Footer/>
    </>
  )
}

export default Contact
