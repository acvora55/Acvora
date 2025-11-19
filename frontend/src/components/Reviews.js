import React from 'react'
import { reviewsData } from './data'
import ReviewsItem from './ReviewsItem'

const Reviews = () => {
  return (
    <>
    <div className="p-8 box-border " >
     <div className="p-8  my-3  lg:my-4">
      <h2 className="text-2xl  sm:text-3xl lg:text-4xl mb-3 text-center font-bold uppercase ">Reviews</h2>
      <div className="flex flex-col items-center justify-center md:flex md:flex-row lg:gap-10 lg:items-center lg:justify-around lg:mt-2">
        {reviewsData.map(item=>(
          <ReviewsItem item={item} key={item.id}/>
        ))}
      </div>
     </div>
    </div>
    </>
  )
}

export default Reviews
