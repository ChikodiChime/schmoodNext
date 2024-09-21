'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { FaArrowsRotate } from 'react-icons/fa6'

const ReloadBtn = () => {
    const router = useRouter()

    const handleRefresh = (e: React.MouseEvent) => {
        e.preventDefault()
        router.refresh() // This reloads the page
    }

    return (
        <button onClick={handleRefresh} className='flex items-center gap-2 '>
            <span className='text-[#E3694C] text-sm hover:text-gray-700'><FaArrowsRotate /></span>
            
            <span className='text-gray-700 text-sm '>Refresh Page</span>
        </button>
    )
}

export default ReloadBtn
