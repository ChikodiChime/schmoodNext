'use client'
import { useState } from 'react'
import { Icon } from '@iconify-icon/react'
import IconList from '../utils/moods'
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
      <div className='grid grid-cols-5 gap-5 px-20 py-5 '>
        {IconList.map((item, index) => (
          <a
            href={item.to}
            key={index}
            className='icon-wrapper flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-[#E3694C] p-5 transition-all hover:bg-[#E3694C] '
          >
            <Icon width='72' height='72' icon={item.icon} className='icon' />
            <span>{item.name}</span>
          </a>
        ))}
      </div>
    </>
  )
}

export default Moods
