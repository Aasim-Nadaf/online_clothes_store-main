import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()

  const goToCollection = () => {
    navigate('/collection?openFilter=true')
    window.scrollTo(0, 0)
  }

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>

      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>

          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>
              OUR BESTSELLERS
            </p>
          </div>

          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>
            Latest Arrivals
          </h1>

          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>
              SHOP NOW
            </p>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>

          <button
            onClick={goToCollection}
            className='mt-8 px-6 py-3 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition'
          >
            SHOP NOW
          </button>

        </div>
      </div>

      {/* Hero Right Side */}
      <img
        className='w-full sm:w-1/2 object-cover'
        src='https://images.unsplash.com/photo-1441986300917-64674bd600d8'
        alt=''
      />

    </div>
  )
}

export default Hero