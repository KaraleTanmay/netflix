import { Favorite } from '@mui/icons-material'
import React, { useState } from 'react'
import ReactPlayer from 'react-player';

export default function ListItem(props) {

    const [isHovered, setIsHovered] = useState(false)

    const handleEnterState = () => {
        setIsHovered(true)
    }
    const handleOutState = () => {
        setIsHovered(false)
    }

    return (
        <div className="min-w-[264px] h-[295px] bg-main overflow-hidden" onMouseEnter={handleEnterState} onMouseLeave={handleOutState}>
            {
                !isHovered ? (<img className='w-full h-[148px] object-cover cursor-pointer' src={props.item.poster} alt="" />) : (<div className='w-full h-[148px] object-cover cursor-pointer'><ReactPlayer width={"264px"} height="148px" url={props.item.trailer} playing={true} ></ReactPlayer></div>)
            }

            <div className='text-white flex flex-col mx-3 '>
                <div className='flex justify-between my-1 items-center'>
                    <span className='text-xl'>{props.item.name}</span>
                    <div className='text-xs flex items-center'>
                        <Favorite></Favorite>
                        <span>288k</span>
                    </div>
                </div>
                <div className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam magnam ullam ab labore eligendi hic harum facere veritatis, doloremque aliquid!</div>
            </div>
        </div>
    )
}
