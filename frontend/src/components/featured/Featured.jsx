import { InfoOutlined, PlayArrow } from '@mui/icons-material'
import React from 'react'
import axios from 'axios'
// import bg from "./movie_name_logo.png"

export default function Featured(props) {
    return (
        <div>
            {props.type &&
                (<div className='absolute left-16 top-24 space-x-5 text-white flex justify-between items-center'>
                    <span className='text-3xl'>{props.type === "movies" ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre" className='bg-main p-1 text-center space-y-1 text-xl rounded-md border border-white'>
                        <option>Genre</option>
                        {["Adventure", "Comedy", "Crime", "Fantasy", "Horror", "Sci-fi", "Thriller", "Documentary"].map((element, i) => {
                            return (<option value={element} key={i}>{element}</option>)
                        })}
                    </select>
                </div>)
            }
            <div>
                <img className='w-full h-full object-cover' src="https://images4.alphacoders.com/909/thumb-1920-909185.jpg" alt="" />
            </div>
            <div className='w-1/3 absolute left-16 bottom-10 space-y-2 text-white flex flex-col items-center'>
                <img className='w-5/6 rounded-md' src="https://i.pinimg.com/originals/2e/34/c3/2e34c3ac29695dcc2aa122d769e96ad1.jpg" alt="" />
                <span className='bg-white/30 text-center rounded-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id beatae aliquam recusandae voluptatem accusamus quibusdam esse, vel veritatis impedit inventore suscipit rerum sed eveniet odio earum, nobis aperiam! Voluptatibus odio est consequuntur, maiores quo similique quam ducimus saepe. Ab, dolores.</span>
                <div className="flex justify-evenly w-2/3">
                    <button className='bg-white text-black w-24 h-10 space-x-2 rounded-lg flex items-center justify-center'>
                        <PlayArrow></PlayArrow>
                        <span>Play</span>
                    </button>
                    <button className='bg-zinc-400 text-white w-24 h-10 space-x-2 rounded-lg flex items-center justify-center'>
                        <InfoOutlined></InfoOutlined>
                    </button>
                </div>
            </div>
        </div>
    )
}
