import React from 'react'
import Footer from '../components/Footer'
import CardItems from '../FooterComponents/CardItems'
import HeroSection from '../FooterComponents/HeroSection'
import OtherCompanion from '../FooterComponents/OtherCompanion'
import Question from '../FooterComponents/Question'
import Quote from '../FooterComponents/Quote'


const Companion = () => {
  return (
    <>
      <HeroSection/>
      <CardItems/>
      <CardItems/>
      <Quote/>
      <Question/>
      <OtherCompanion />
      <Footer/>
   </>
  )
}

export default Companion
