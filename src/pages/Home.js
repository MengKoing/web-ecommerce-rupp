import React from 'react'
import { Link } from 'react-router-dom'
import ProductSection from '../components/ProductSection'
import { SliderSection } from '../components/SliderSection'

const Home = () => {
  return (
    <div>
        <div className="bg-box">
        <img src="images/banner.webp" alt="" />
      </div>
     <SliderSection />

         <div className='mt' >
            <ProductSection />
         </div>
  

    </div>
  )
}

export default Home