'use client'
import React from 'react'
import { Rings } from 'react-loader-spinner'
export default function Loading() {
    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <Rings
                visible={true}
                height='120'
                width='120'
                color='#E3694C'
                ariaLabel='rings-loading'
                wrapperStyle={{}}
                wrapperClass=''
            />
        </div>
    )
}
