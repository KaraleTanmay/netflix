import { ArrowBack } from '@mui/icons-material'
import React from 'react'
import video from './Cat.mp4';

export default function Watch() {
    return (
        <div className='w-full h-full bg-main flex justify-center items-center'>
            <div className='absolute top-5 left-5 flex items-center space-x-3 cursor-pointer z-30'>
                <ArrowBack></ArrowBack>
                <span className='text-xl'>Home</span>
            </div>
            <video className='w-full h-full object-cover' src={video} type="video/mp4" autoPlay controls progress></video>
        </div>
    )
}
