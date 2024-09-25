'use client'
import { useState, Suspense } from 'react'
import { Icon } from '@iconify-icon/react'
import IconList from '../utils/moods'
import Link from 'next/link'
import { FaAngleLeft } from 'react-icons/fa6'
import Loading from './loading'
type UserTime = {
    greeting: string
}
const Moods: React.FC = () => {
    let today = new Date()
    let curHr = today.getHours()
    const currentGreeting = (): string => {
        if (curHr < 12) {
            return 'Morning'
        } else if (curHr < 17) {
            return 'Afternoon'
        } else {
            return 'evening'
        }
    }

    return (
        <>
         <Link href={'/'} className='flex items-center my-5 gap-2 text-sm pl-10'>
                <span className='text-[#E3694C]  hover:text-gray-700'>
                    <FaAngleLeft/>
                </span>
                <span className='text-gray-700'>Go Back</span>
            </Link>
            <div className=' flex w-full flex-col items-center justify-center gap-5'>
                <h1 className=''>Hey!!! </h1>
                <p className='text-xl text-center '>
                    How are you feeling this {currentGreeting()}?
                </p>
            </div>
           
            <Suspense fallback={<Loading/>}>
            <div className='grid grid-cols-2 gap-5 px-2 py-5 sm:px-10 md:grid-cols-3 lg:grid-cols-4 '>
                {IconList.map((mood, index) => (
                    <Link
                        key={index}
                        href={`/Moods/${mood.name.toLowerCase()}`}
                        passHref
                        className='icon-wrapper flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-[#E3694C] p-5 transition-all hover:bg-[#E3694C] '
                    >
                        <Icon
                            width='72'
                            height='72'
                            icon={mood.icon}
                            className='icon'
                        />
                        <span>{mood.name}</span>
                    </Link>
                ))}
            </div>
            </Suspense>
            
        </>
    )
}

export default Moods
