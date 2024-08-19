import React from 'react'
import Image from 'next/image';
import {FaArrowRight} from 'react-icons/fa'


const Home = () => {
  return (
    <section className="h-screen">
        <div className="flex  items-center w-full h-full justify-center px-5 ">
          <div className="left">
            <Image
            src="/boy.svg"
            alt="schmood logo"
            width={600}  // Specify width
            height={800}
            />
          </div>
          <div className="w-1/2 text-center space-y-3 flex flex-col items-center ">
            <h1 className='salsa-regular '>Can&apos;t figure out what to eat?</h1>
            <p className='text-xl '>We gatchu covered boo!</p>
            <a href='/Moods'  className='px-12 py-3 bg-[#E3694C] text-white flex items-center justify-center gap-2 cursor-pointer'>Next <FaArrowRight/></a>
          </div>
        </div>
    </section>
  )
}

export default Home