'use client'
import { useState } from 'react'
import { Icon } from '@iconify-icon/react'
import IconList from '../utils/moods'
import Link from 'next/link'
type UserTime = {
  greeting: string
}
const Moods: React.FC = () => {
  let today = new Date()
  let curHr = today.getHours()
  const currentGreeting = (): string => {
    if (curHr < 12) {
      return 'Morning'
    } else if (curHr < 18) {
      return 'Afternoon'
    } else {
      return 'evening'
    }
  }

  return (
    <>
      <div className=' flex w-full flex-col items-center justify-center'>
        <h1 className=''>Hey!!! </h1>
        <p className='text-xl'>How are you feeling this {currentGreeting()}?</p>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-2 sm:px-10 py-5 '>
        {IconList.map((mood, index) => (
          <Link
            key={index}
            href={`/Moods/${mood.name.toLowerCase()}`}
            passHref
            className='icon-wrapper w-full flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-[#E3694C] p-5 transition-all hover:bg-[#E3694C] '
          >
            <Icon width='72' height='72' icon={mood.icon} className='icon' />
            <span>{mood.name}</span>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Moods
