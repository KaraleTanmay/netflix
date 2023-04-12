import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import React, { useRef, useState } from 'react'
import ListItem from '../listItem/ListItem'

export default function List(props) {

    const listRef = useRef()
    const [slideNumber, setSlideNumber] = useState(0)

    const handleOnClick = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1)
            listRef.current.style.transform = `translateX(${230 + distance}px)`
        }
        else if (direction === "right" && slideNumber < props.list.length - 5) {
            setSlideNumber(slideNumber + 1)
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
        }
    }

    return (
        <div className="w-full mt-3">
            <span className="text-white m-5 text-2xl">{props.listname}</span>
            <div className="text-white my-4 relative max-width">
                <div className='cursor-pointer bg-use/70 w-12 h-[295px] flex items-center justify-center z-10 absolute left-0' onClick={() => { handleOnClick("left") }}>
                    <ArrowBackIos></ArrowBackIos>
                </div>
                <div className="flex space-x-1 translate-x-0 transition-all ease-in duration-300" ref={listRef}>
                    {
                        props.list.map((ele, i) => <ListItem item={ele} key={i} />)
                    }
                </div>
                <div className='cursor-pointer bg-use/70 w-12 h-[295px] flex items-center justify-center absolute right-0 z-10 top-0 bottom-0' onClick={() => { handleOnClick("right") }}>
                    <ArrowForwardIos></ArrowForwardIos>
                </div>
            </div>
        </div>
    )
}
